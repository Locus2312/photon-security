import { NextResponse, type NextRequest } from "next/server";
import { PARALLAX } from "@/lib/parallax-data";

// The Parallax app. Kept here, in server-only code, so it is not in any page
// bundle and only reaches visitors once the launch time has passed.
const APP_URL = "https://parallax.photonsecurity.in";

// Always answer with the current time; never cache.
export const dynamic = "force-dynamic";

/**
 * Launch state for the Parallax page, from the server's clock (so changing a
 * device clock changes nothing). In development only, `?at=<ISO date>` stands
 * in for "now", to preview the launch.
 */
export function GET(request: NextRequest) {
  let now = Date.now();
  if (process.env.NODE_ENV !== "production") {
    const at = Date.parse(request.nextUrl.searchParams.get("at") ?? "");
    if (!Number.isNaN(at)) now = at;
  }

  const launched = now >= Date.parse(PARALLAX.launchDate);

  return NextResponse.json(
    { now, launched, appUrl: launched ? APP_URL : null },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
