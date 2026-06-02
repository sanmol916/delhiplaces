import { NextResponse, type NextRequest } from "next/server";
import { resolveTenant } from "@/lib/tenants";

/**
 * If the request comes in on a tenant domain (e.g. laxminagardelhi.com),
 * transparently show that area's hub at the root URL. The address bar still
 * reads "/", but the app renders /laxmi-nagar. On any other host (localhost,
 * the default domain), the normal landing page is shown.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only rewrite the root path; deeper paths work normally.
  if (pathname === "/") {
    const slug = resolveTenant(req.headers.get("host"));
    if (slug) {
      const url = req.nextUrl.clone();
      url.pathname = `/${slug}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Skip static assets and Next internals.
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
