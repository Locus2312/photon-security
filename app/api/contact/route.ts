import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/**
 * Rate limiting function - protects against DDoS
 * @param identifier - Usually IP address
 * @param limit - Max requests allowed
 * @param windowMs - Time window in milliseconds
 */
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
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;',
        '\r': '',
        '\n': ' ',
        '\t': ' '
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
    "investment opportunity"
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
    "yopmail"
  ];
  const emailDomain = data.email.split("@")[1]?.toLowerCase() || "";
  if (disposableDomains.some((d) => emailDomain.includes(d))) return true;

  const suspiciousPatterns = [
    /\b\d{10,}\b/, 
    /[A-Z]{20,}/, 
    /(dear|hello)\s+(sir|madam)/i, 
  ];
  if (suspiciousPatterns.some(pattern => pattern.test(data.message))) return true;

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
        { 
          status: 429, 
          headers: { 
            "Content-Type": "application/json",
            "Retry-After": "60"
          } 
        }
      );
    }

    const body = await request.json();
    const { name, email, company, message, honeypot, phone } = body;

    if (honeypot) {
      console.log("[SPAM BLOCKED] Honeypot triggered:", { 
        email: email?.substring(0, 10) + "...", 
        ip: clientIP 
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
      phone: phone ? sanitizeInput(phone, 20) : "",
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
      timestamp: new Date().toISOString()
    });

    if (process.env.RESEND_API_KEY) {
      try {
        const { data, error } = await resend.emails.send({
          from: "Photon Security <noreply@photonsecurity.in>", 
          to: "admin@photonsecurity.in", 
          replyTo: sanitizedData.email.replace(/[\r\n]/g, ''), 
          subject: `New Contact: ${sanitizedData.name} from ${sanitizedData.company}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { 
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                  line-height: 1.6; 
                  color: #333; 
                  margin: 0;
                  padding: 0;
                  background-color: #f5f5f5;
                }
                .container { 
                  max-width: 600px; 
                  margin: 20px auto; 
                  background: white;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
                .header { 
                  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                  color: white; 
                  padding: 30px 20px; 
                  text-align: center;
                }
                .header h2 {
                  margin: 0;
                  font-size: 24px;
                  font-weight: 600;
                }
                .content { 
                  padding: 30px 20px; 
                }
                .field { 
                  margin-bottom: 20px; 
                }
                .label { 
                  font-weight: 600; 
                  color: #4b5563;
                  font-size: 12px;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                  margin-bottom: 8px;
                }
                .value { 
                  padding: 12px; 
                  background: #f9fafb; 
                  border-radius: 6px;
                  border: 1px solid #e5e7eb;
                  color: #1f2937;
                }
                .value a {
                  color: #2563eb;
                  text-decoration: none;
                }
                .value a:hover {
                  text-decoration: underline;
                }
                .footer { 
                  background: #f3f4f6; 
                  padding: 20px; 
                  font-size: 12px; 
                  color: #6b7280;
                  border-top: 1px solid #e5e7eb;
                }
                .footer p {
                  margin: 5px 0;
                }
                .message-box {
                  white-space: pre-wrap;
                  word-wrap: break-word;
                  font-family: 'Courier New', monospace;
                  font-size: 13px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>🔒 New Contact Form Submission</h2>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">Name</div>
                    <div class="value">${sanitizedData.name}</div>
                  </div>
                  <div class="field">
                    <div class="label">Email</div>
                    <div class="value">
                      <a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a>
                    </div>
                  </div>
                  <div class="field">
                    <div class="label">Company</div>
                    <div class="value">${sanitizedData.company}</div>
                  </div>
                  ${sanitizedData.phone ? `
                  <div class="field">
                    <div class="label">Phone</div>
                    <div class="value">${sanitizedData.phone}</div>
                  </div>
                  ` : ''}
                  <div class="field">
                    <div class="label">Message</div>
                    <div class="value message-box">${sanitizedData.message}</div>
                  </div>
                </div>
                <div class="footer">
                  <p><strong>Submitted from IP:</strong> ${clientIP}</p>
                  <p><strong>Timestamp:</strong> ${new Date().toLocaleString('en-US', { 
                    dateStyle: 'full', 
                    timeStyle: 'long' 
                  })}</p>
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
      JSON.stringify({ 
        success: true, 
        message: "Message sent successfully" 
      }),
      {
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          "X-Content-Type-Options": "nosniff"
        },
      }
    );
  } catch (error) {
    console.error("[CONTACT FORM ERROR]", {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Internal server error" 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
}
