import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimit(identifier: string, limit = 3, windowMs = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 60000);

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0] || realIp || "unknown";
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

function sanitizeInput(input: string, maxLength = 5000): string {
  return input.trim().slice(0, maxLength).replace(/[<>]/g, "");
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
  ];

  const combinedText =
    `${data.name} ${data.email} ${data.message}`.toLowerCase();

  if (spamKeywords.some((keyword) => combinedText.includes(keyword))) {
    return true;
  }

  const linkCount = (data.message.match(/https?:\/\//g) || []).length;
  if (linkCount > 2) return true;

  if (/(.)\1{10,}/.test(data.message)) return true;

  const uppercaseRatio =
    (data.message.match(/[A-Z]/g) || []).length / data.message.length;
  if (data.message.length > 20 && uppercaseRatio > 0.7) return true;

  const disposableDomains = [
    "tempmail",
    "throwaway",
    "guerrillamail",
    "10minutemail",
    "mailinator",
  ];
  const emailDomain = data.email.split("@")[1]?.toLowerCase() || "";
  if (disposableDomains.some((d) => emailDomain.includes(d))) return true;

  return false;
}

export async function POST(request: Request) {
  try {
    const clientIP = getClientIP(request as NextRequest);
    if (!rateLimit(clientIP, 3, 60000)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Too many requests. Please try again in a minute.",
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await request.json();
    const { name, email, company, message, honeypot, phone } = body;

    if (honeypot) {
      console.log("[SPAM BLOCKED] Honeypot triggered:", { email, ip: clientIP });
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
      phone: phone ? sanitizeInput(phone, 20) : "",
      message: sanitizeInput(message, 5000),
    };

    if (detectSpam(sanitizedData)) {
      console.log("[SPAM BLOCKED] Spam detected:", {
        email: sanitizedData.email,
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
      email: sanitizedData.email,
      company: sanitizedData.company,
      phone: sanitizedData.phone,
      message: sanitizedData.message.substring(0, 100) + "...",
      ip: clientIP,
    });

    if (process.env.RESEND_API_KEY) {
      try {
        const { data, error } = await resend.emails.send({
          from: "Photon Security <noreply@photonsecurity.in>", 
          to: "admin@photonsecurity.in", 
          replyTo: sanitizedData.email,
          subject: `New Contact: ${sanitizedData.name} from ${sanitizedData.company}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #4b5563; }
                .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
                .footer { background: #e5e7eb; padding: 15px; border-radius: 0 0 8px 8px; font-size: 12px; color: #6b7280; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>New Contact Form Submission</h2>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">Name:</div>
                    <div class="value">${sanitizedData.name}</div>
                  </div>
                  <div class="field">
                    <div class="label">Email:</div>
                    <div class="value"><a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></div>
                  </div>
                  <div class="field">
                    <div class="label">Company:</div>
                    <div class="value">${sanitizedData.company}</div>
                  </div>
                  <div class="field">
                    <div class="label">Phone:</div>
                    <div class="value">${sanitizedData.phone || "Not provided"}</div>
                  </div>
                  <div class="field">
                    <div class="label">Message:</div>
                    <div class="value" style="white-space: pre-wrap;">${sanitizedData.message}</div>
                  </div>
                </div>
                <div class="footer">
                  <p>Submitted from IP: ${clientIP}</p>
                  <p>Timestamp: ${new Date().toISOString()}</p>
                </div>
              </div>
            </body>
            </html>
          `,
        });

        if (error) {
          console.error("[EMAIL ERROR]", error);
        } else {
          console.log("[EMAIL SENT] Successfully sent. Email ID:", data?.id);
        }
      } catch (emailError) {
        console.error("[EMAIL ERROR]", emailError);
      }
    } else {
      console.log("[EMAIL SKIPPED] RESEND_API_KEY not configured");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("[CONTACT FORM ERROR]", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
