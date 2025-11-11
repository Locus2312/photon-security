export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companySize, scope, assets, timeline, email } = body;

    if (!companySize || !scope || !assets || !timeline || !email) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400 }
      );
    }

    console.log("[QUOTE REQUEST]", {
      companySize,
      scope,
      assets,
      timeline,
      email,
    });

    const estimatedPrice = calculateEstimate(companySize, scope, assets);

    return new Response(
      JSON.stringify({
        success: true,
        quote: {
          estimate: estimatedPrice,
          message:
            "Our team will follow up with a detailed quote within 24 hours.",
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Quote request error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500 }
    );
  }
}

function calculateEstimate(
  companySize: string,
  scope: string,
  assets: number
): string {
  const baseRates: Record<string, number> = {
    startup: 250000,
    smb: 500000,
    enterprise: 1500000,
  };

  const scopeMultipliers: Record<string, number> = {
    audit: 1,
    vapt: 1.2,
    mss: 1.5,
    "full-assessment": 2,
  };

  const base = baseRates[companySize] || 500000;
  const multiplier = scopeMultipliers[scope] || 1;
  const assetAdjustment = Math.min(assets / 100, 1);

  const total = Math.ceil(base * multiplier * (1 + assetAdjustment));

  if (total < 200000) return "₹2–5L";
  if (total < 1000000) return "₹5–15L";
  if (total < 3000000) return "₹15–50L";
  return "₹50L+";
}
