import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const preferredLanguage = request.cookies.get("vantix-language")?.value;

  if (preferredLanguage === "en") {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/en", request.url));
    }
    if (pathname === "/servicios") {
      return NextResponse.redirect(new URL("/en/services", request.url));
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(
    "x-vantix-locale",
    pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es",
  );

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
