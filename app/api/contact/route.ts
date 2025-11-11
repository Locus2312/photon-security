export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message, honeypot } = body;

    if (honeypot) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid request" }),
        { status: 400 }
      );
    }

    if (!name || !email || !company || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400 }
      );
    }

    console.log("[CONTACT FORM]", { name, email, company, message });

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500 }
    );
  }
}
