import { NextRequest } from "next/server";

import jwt from "jsonwebtoken";

const getDataFromToken = (request: NextRequest) => {
  try {
    // Retrieve the token from the cookies
    const token = request.cookies.get("trackit_token")?.value || "";

    // Verify and decode the token using the secret key
    const decodedToken: any = jwt.verify(token, process.env.JWT_TOKEN_SECRET!);

    // Return the user ID from the decoded token
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getDataFromToken;
