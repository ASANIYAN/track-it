import { NextRequest, NextResponse } from "next/server";

import connect from "@/utils/db/mongodb-connect";
import getDataFromToken from "@/utils/helpers/get-data-from-token";

import User from "@/models/user";
import Project from "@/models/project";

export const PATCH = async (request: NextRequest) => {
  try {
    const { name, id } = await request.json();

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

    const updatedProject = await Project.findByIdAndUpdate(id, {
      $set: { name },
    });

    return NextResponse.json({
      message: "Project renamed successfully",
      success: true,
      project: updatedProject,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
