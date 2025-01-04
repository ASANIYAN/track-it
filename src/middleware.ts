import { NextRequest, NextResponse } from "next/server";

import { COOKIE_NAME } from "./constants/constants";
import { verifyAuth } from "./utils/helpers/verify-auth";

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

  // Get token from Authorization header or cookie
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : request.cookies.get(COOKIE_NAME)?.value || "";

  // check if token is available and verified
  const verifiedToken = await verifyAuth(token).catch((err) => {
    return null;
  });

  // If trying to access a protected path without a token, redirect to the login page
  if (!isPublicPath && !verifiedToken) {
    const response = NextResponse.redirect(new URL("/login", request.nextUrl));
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  // check if token is verified and path is a public path, redirect appropriately
  if (isPublicPath && verifiedToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  const response = NextResponse.next();

  if (verifiedToken) {
    response.headers.set("Authorization", `Bearer ${token}`);
  }

  return response;
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
