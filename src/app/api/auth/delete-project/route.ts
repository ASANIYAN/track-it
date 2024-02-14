import { NextRequest, NextResponse } from "next/server";

import connect from "@/utils/db/mongodb-connect";
import getDataFromToken from "@/utils/helpers/get-data-from-token";

import Project from "@/models/project";
import User from "@/models/user";

export const DELETE = async (request: NextRequest) => {
  try {
    const { id } = await request.json();
    const userId = await getDataFromToken(request);

    await connect();
    const user = await User.findOne({ _id: userId });
    // check if user info gotten from user-id search exists
    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token. Please reauthenticate" },
        { status: 400 }
      );
    }

    await Project.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Project deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
