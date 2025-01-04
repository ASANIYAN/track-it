import { NextRequest, NextResponse } from "next/server";

import connect from "@/utils/db/mongodb-connect";
import getDataFromToken from "@/utils/helpers/get-data-from-token";

import Project from "@/models/project";
import User from "@/models/user";
import getUsersForProjects from "@/utils/helpers/get-users-for-projects";
import { COOKIE_NAME } from "@/constants/constants";

export const GET = async (request: NextRequest) => {
  try {
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

    const projects = await Project.find({
      "users.user": userId,
    });

    const projectsWithUsers = await getUsersForProjects(projects);

    return NextResponse.json({
      message: "Project fetched successfully",
      success: true,
      projectsWithUsers,
    });
  } catch (error: any) {
    console.log(error.message, "error getting projects from DB");

    if (error.message.includes("jwt expired")) {
      return NextResponse.json({ error: "jwt expired" }, { status: 401 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
