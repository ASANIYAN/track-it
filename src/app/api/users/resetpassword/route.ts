import { NextRequest, NextResponse } from "next/server";

import User from "@/models/user";
import connect from "@/utils/db/mongodb-connect";

export async function POST(request: NextRequest) {
  try {
    // extracts the token property from the JSON body of the incoming request.
    const { password, token } = await request.json();

    await connect();

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired link" },
        { status: 400 }
      );
    }

    // Update user properties and save the changes
    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Password Reset Successful",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
