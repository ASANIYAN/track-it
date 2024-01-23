import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "./constants/constants";

export const middleware = async (request: NextRequest) => {
  const path = request.nextUrl.pathname;

  // Define paths that are considered public (accessible without a token)
  const isPublicPath =
    path === "/login" ||
    path === "/sign-up" ||
    path === "/forgot-password" ||
    path === "/reset-password" ||
    path === "/resend-email" ||
    path === "/verify-email";

  // Get the token from the cookies
  const token = request.cookies.get(COOKIE_NAME)?.value || "";

  // Redirect logic based on the path and token presence
  if (isPublicPath && token) {
    // If trying to access a public path with a token, redirect to the home page
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // If trying to access a protected path without a token, redirect to the login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
};

// It specifies the paths for which this middleware should be executed.
// In this case, it's applied to '/', '/profile', '/login', '/forgot-password' and '/reset-password'.
export const config = {
  matcher: [
    "/",
    "/login",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/resend-email",
    "/verify-email",
  ],
};
