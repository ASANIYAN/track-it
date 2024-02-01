import { NextRequest, NextResponse } from "next/server";

import bcryptjs from "bcryptjs";

import User from "@/models/user";
import connect from "@/utils/db/mongodb-connect";

export const POST = async (request: NextRequest) => {
  try {
    // extracts the password and token property from the JSON body of the incoming request.
    const { password, token } = await request.json();

    await connect();

    // check if password is empty
    if (!password)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired link. Kindly request for a new link" },
        { status: 400 }
      );
    }

    // Hash password using bcryptjs.
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Update user properties and save the changes
    user.password = hashedPassword;
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
};
