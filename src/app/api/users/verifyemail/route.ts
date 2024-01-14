import { NextRequest, NextResponse } from "next/server";

import User from "@/models/user";
import connect from "@/utils/db/mongodb-connect";

export async function POST(request: NextRequest) {
  try {
    // It extracts the token property from the JSON body of the incoming request.
    const { token } = await request.json();

    await connect();

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Update user properties and save the changes
    user.usVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email Verified successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
