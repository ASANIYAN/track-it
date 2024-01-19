import { NextRequest, NextResponse } from "next/server";

import User from "@/models/user";
import connect from "@/utils/db/mongodb-connect";
import { sendEmail } from "@/utils/helpers/mailer";

export const POST = async (request: NextRequest) => {
  try {
    const { email } = await request.json();

    await connect();

    // check if email is empty
    if (!email)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );

    //check if user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    //send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: existingUser._id });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
