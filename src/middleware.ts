import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req, res) {
    const pathname = req.nextUrl.pathname;
    const isAuth = await getToken({ req });
    const sensitve = ["/dashboard"];
    const isLoginPage =
      pathname.startsWith("/login") || pathname.startsWith("/register");

    const sensitiveRoute = sensitve.some((route) => pathname.startsWith(route));

    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return NextResponse.next();
    }
    if (!isAuth && sensitiveRoute) {
      let from = req.nextUrl.pathname;

      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return NextResponse.redirect(
        new URL(`/loging?from=${encodeURIComponent(from)}`, req.url)
      );
    }
    if (pathname === "/") {
      return NextResponse.next();
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};
