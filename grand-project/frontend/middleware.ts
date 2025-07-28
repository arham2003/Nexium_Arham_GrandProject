// middleware.ts (root)

import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  // Get current path
  const { pathname } = request.nextUrl;

  const supabase = require("@supabase/ssr").createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: () => {}, // not setting cookies again here
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is NOT logged in and trying to access a protected route
  if (
    !user &&
    (pathname.startsWith("/pitch") || pathname.startsWith("/saved-pitches"))
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/auth/login";
    redirectUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If user IS logged in and visiting login or signup, redirect them
  if (user && (pathname === "/auth/login" || pathname === "/auth/signup")) {
    return NextResponse.redirect(new URL("/pitch", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
