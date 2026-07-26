import { NextRequest, NextResponse } from "next/server";

/**
 * Portfolio-only middleware.
 * Blog and desk live on engineering-blog (blog./desk.souravamseekar.com).
 * Apex /blog always redirects to the publication platform.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    const dest = new URL(
      pathname === "/blog" ? "/" : pathname.replace(/^\/blog/, "") || "/",
      "https://blog.souravamseekar.com"
    );
    dest.search = req.nextUrl.search;
    return NextResponse.redirect(dest, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog", "/blog/:path*"],
};
