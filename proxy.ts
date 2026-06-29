import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { rateLimit, getClientIP } from "./lib/rate-limit";

const RATE_LIMITS = {
  api: { limit: 120, windowMs: 60000 },
  auth: { limit: 10, windowMs: 60000 },
  chat: { limit: 20, windowMs: 60000 },
  page: { limit: 300, windowMs: 60000 },
};

export function proxy(request: NextRequest) {
  const ip = getClientIP(request.headers);
  const path = request.nextUrl.pathname;

  if (path.startsWith("/api/")) {
    let limitConfig = RATE_LIMITS.api;
    let identifier = `api_${ip}`;

    if (path.startsWith("/api/chat")) {
      limitConfig = RATE_LIMITS.chat;
      identifier = `chat_${ip}`;
    } else if (
      path.startsWith("/api/contact") ||
      path.startsWith("/api/quote")
    ) {
      limitConfig = RATE_LIMITS.auth;
      identifier = `form_${ip}`;
    }

    const { success, limit, remaining, reset } = rateLimit(
      identifier,
      limitConfig.limit,
      limitConfig.windowMs,
    );

    if (!success) {
      console.log(
        `[MIDDLEWARE RATE LIMIT] IP: ${ip}, Path: ${path}, Limit: ${limit}`,
      );
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Too many requests. Please try again later.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
            "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
          },
        },
      );
    }

    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", limit.toString());
    response.headers.set("X-RateLimit-Remaining", remaining.toString());
    response.headers.set("X-RateLimit-Reset", reset.toString());
    return response;
  }

  // Rate Limiting for Pages (Home page, about, etc.)
  // Skip rate limiting for Next.js background prefetching (RSC payloads)
  // because Next.js automatically prefetches EVERY link on the screen in the background,
  // which can instantly burn a user's rate limit quota without them doing anything.
  const isPrefetch = request.headers.get("Next-Router-Prefetch") || request.headers.get("RSC");
  
  if (isPrefetch) {
    return NextResponse.next();
  }

  const { success, limit, remaining, reset } = rateLimit(
    `page_${ip}`,
    RATE_LIMITS.page.limit,
    RATE_LIMITS.page.windowMs,
  );

  if (!success) {
    console.log(`[PAGE RATE LIMIT] IP: ${ip}, Path: ${path}, Limit: ${limit}`);
    return new NextResponse(
      "<h1>429 - Too Many Requests</h1><p>You have made too many requests. Please slow down and try again in a minute.</p>",
      {
        status: 429,
        headers: {
          "Content-Type": "text/html",
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
          "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
        },
      },
    );
  }

  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Limit", limit.toString());
  response.headers.set("X-RateLimit-Remaining", remaining.toString());
  response.headers.set("X-RateLimit-Reset", reset.toString());
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
