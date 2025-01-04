import { NextRequest } from "next/server";

import jwt from "jsonwebtoken";

import { COOKIE_NAME } from "@/constants/constants";

const getDataFromToken = (request: NextRequest) => {
  try {
    // First try to get token from Authorization header
    const authHeader = request.headers.get("authorization");
    let token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : "";

    // If no token in header, try cookies as fallback
    if (!token) {
      token = request.cookies.get(COOKIE_NAME)?.value || "";
    }

    if (!token) {
      throw new Error("No token found");
    }

    // Verify and decode the token using the secret key
    const decodedToken: any = jwt.verify(token, process.env.JWT_TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getDataFromToken;
