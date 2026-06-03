import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { resolveTenant } from "@/lib/tenants";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-only-insecure-secret-change-me",
);
const ADMIN_COOKIE = "mohalla_admin";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Protect the admin area (except the login page).
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    let valid = false;
    if (token) {
      try {
        await jwtVerify(token, secret);
        valid = true;
      } catch {
        valid = false;
      }
    }
    if (!valid) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 2. Multi-tenant: on a mapped domain, show that area's hub at "/".
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
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
