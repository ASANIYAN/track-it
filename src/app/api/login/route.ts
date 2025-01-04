import { NextRequest, NextResponse } from "next/server";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "@/models/user";
import connect from "@/utils/db/mongodb-connect";
import { COOKIE_NAME } from "@/constants/constants";

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

    if (!existingUser) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    //check if password is correct
    const validPassword = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!validPassword) {
      return NextResponse.json(
        { error: "Incorrect email or password" },
        { status: 400 }
      );
    }

    //create token data
    // A JavaScript object (tokenData) is created to store essential user
    // information. In this case, it includes the user's unique identifier (id),
    // username, and email.

    const tokenData = {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
    };

    // Create a token with expiration of 1 day
    const token = jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    // Create a JSON response indicating successful login
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    // Set the token as an HTTP-only cookie
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
    });

    response.headers.set("Authorization", `Bearer ${token}`);

    return response;
  } catch (error: any) {
    console.log(error, "error");

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
