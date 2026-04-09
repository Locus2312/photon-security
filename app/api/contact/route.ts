import { NextRequest } from "next/server";
import { Resend } from "resend";
import { PhotonSecurityEmail } from "@/emails/photon-security-email";
import { ThankYouEmail } from "@/emails/thank-you-email";

const resend = new Resend(process.env.RESEND_API_KEY);



function getClientIP(request: NextRequest): string {
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  return "unknown";
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

function sanitizeInput(input: string, maxLength = 5000): string {
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>'"&\r\n\t]/g, (char) => {
      const entities: Record<string, string> = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "&": "&amp;",
        "\r": "",
        "\n": " ",
        "\t": " ",
      };
      return entities[char] || char;
    });
}

function detectSpam(data: {
  name: string;
  email: string;
  message: string;
}): boolean {
  const spamKeywords = [
    "viagra",
    "casino",
    "lottery",
    "prize",
    "click here",
    "buy now",
    "make money",
    "work from home",
    "earn cash",
    "free money",
    "bitcoin",
    "crypto",
    "investment opportunity",
  ];

  const combinedText =
    `${data.name} ${data.email} ${data.message}`.toLowerCase();

  if (spamKeywords.some((keyword) => combinedText.includes(keyword))) {
    return true;
  }

  const linkCount = (data.message.match(/https?:\/\//gi) || []).length;
  if (linkCount > 2) return true;

  if (/(.)\1{10,}/.test(data.message)) return true;

  const uppercaseCount = (data.message.match(/[A-Z]/g) || []).length;
  const uppercaseRatio = uppercaseCount / data.message.length;
  if (data.message.length > 20 && uppercaseRatio > 0.7) return true;

  const disposableDomains = [
    "tempmail",
    "throwaway",
    "guerrillamail",
    "10minutemail",
    "mailinator",
    "trashmail",
    "fakeinbox",
    "yopmail",
  ];
  const emailDomain = data.email.split("@")[1]?.toLowerCase() || "";
  if (disposableDomains.some((d) => emailDomain.includes(d))) return true;

  const suspiciousPatterns = [
    /\b\d{10,}\b/,
    /[A-Z]{20,}/,
    /(dear|hello)\s+(sir|madam)/i,
  ];
  if (suspiciousPatterns.some((pattern) => pattern.test(data.message)))
    return true;

  return false;
}

export async function POST(request: Request) {
  try {
    const clientIP = getClientIP(request as NextRequest);


    const body = await request.json();
    const { name, email, company, message, honeypot, phone } = body;

    if (honeypot) {
      console.log("[SPAM BLOCKED] Honeypot triggered:", {
        email: email?.substring(0, 10) + "...",
        ip: clientIP,
      });
      return new Response(
        JSON.stringify({ success: false, error: "Invalid request" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!name || !email || !company || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!validateEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (name.length > 100 || company.length > 200) {
      return new Response(
        JSON.stringify({ success: false, error: "Input too long" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (message.length < 10 || message.length > 5000) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Message must be between 10 and 5000 characters",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const sanitizedData = {
      name: sanitizeInput(name, 100),
      email: sanitizeInput(email, 254),
      company: sanitizeInput(company, 200),
      phone: phone ? sanitizeInput(phone, 20) : undefined,
      message: sanitizeInput(message, 5000),
    };

    if (detectSpam(sanitizedData)) {
      console.log("[SPAM BLOCKED] Spam detected:", {
        email: sanitizedData.email.substring(0, 10) + "...",
        ip: clientIP,
      });
      return new Response(
        JSON.stringify({
          success: false,
          error: "Message could not be processed",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("[CONTACT FORM]", {
      name: sanitizedData.name,
      emailDomain: sanitizedData.email.split("@")[1],
      company: sanitizedData.company,
      messageLength: sanitizedData.message.length,
      ip: clientIP,
      timestamp: new Date().toISOString(),
    });

    if (process.env.RESEND_API_KEY) {
      try {
        const timestamp = new Date().toLocaleString("en-US", {
          dateStyle: "full",
          timeStyle: "long",
        });

        // Send email to admin (your team)
        const adminEmail = await resend.emails.send({
          from: "Photon Security <noreply@photonsecurity.in>",
          to: "info@photonsecurity.in",
          replyTo: sanitizedData.email.replace(/[\r\n]/g, ""),
          subject: `New Contact: ${sanitizedData.name} from ${sanitizedData.company}`,
          react: PhotonSecurityEmail({
            name: sanitizedData.name,
            email: sanitizedData.email,
            companyName: sanitizedData.company,
            message: sanitizedData.message,
            phone: sanitizedData.phone,
            clientIP: clientIP,
            timestamp: timestamp,
          }),
        });

        if (adminEmail.error) {
          console.error("[ADMIN EMAIL ERROR]", adminEmail.error);
        } else {
          console.log("[ADMIN EMAIL SENT] ID:", adminEmail.data?.id);
        }

        // Send thank you email to user
        const userEmail = await resend.emails.send({
          from: "Photon Security <noreply@photonsecurity.in>",
          to: sanitizedData.email.replace(/[\r\n]/g, ""),
          subject: "Thank you for contacting Photon Security",
          react: ThankYouEmail({
            name: sanitizedData.name,
            company: sanitizedData.company,
          }),
        });

        if (userEmail.error) {
          console.error("[USER EMAIL ERROR]", userEmail.error);
        } else {
          console.log("[USER EMAIL SENT] ID:", userEmail.data?.id);
        }
      } catch (emailError) {
        console.error("[EMAIL ERROR]", emailError);
      }
    } else {
      console.log("[EMAIL SKIPPED] RESEND_API_KEY not configured");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message sent successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  } catch (error) {
    console.error("[CONTACT FORM ERROR]", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}