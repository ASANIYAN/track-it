import { NextRequest, NextResponse } from "next/server";

import connect from "@/utils/db/mongodb-connect";
import getDataFromToken from "@/utils/helpers/get-data-from-token";
import { User } from "@/models/user";

export const GET = async (request: NextRequest) => {
  try {
    const userId = await getDataFromToken(request);

    await connect();
    const user = await User.findById(
      { _id: userId },
      {
        email: 1,
        isVerified: 1,
        _id: 1,
      }
    );

    // check if user info gotten from user-id search exists
    if (!user) {
      return NextResponse.json(
        { error: "Invalid user. User not found" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "User info fetched successfully",
      success: true,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
