import { NextRequest, NextResponse } from "next/server";

import bcryptjs from "bcryptjs";

import User from "@/models/user";
import connect from "@/utils/db/mongodb-connect";
import { sendEmail } from "@/utils/helpers/mailer";

export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();

    await connect();

    // check if email or password is empty
    if (!email || !password)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );

    //check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password using bcryptjs.
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    //send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.error("Error in user creation:", error.message);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
