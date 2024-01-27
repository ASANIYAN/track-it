import { NextRequest, NextResponse } from "next/server";

import * as jose from "jose";

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

  // Get the token from the cookies
  const token = request.cookies.get(COOKIE_NAME)?.value || "";
  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log(err, "error from verifyAuth");
    }));

  // If trying to access a protected path without a token, redirect to the login page
  if (!isPublicPath && !verifiedToken) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // check if token is verified and path is a public path, redirect appropriately
  if (isPublicPath && verifiedToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
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
