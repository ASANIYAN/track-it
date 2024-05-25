import { COOKIE_NAME } from "@/constants/constants";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    response.cookies.delete(COOKIE_NAME);

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
