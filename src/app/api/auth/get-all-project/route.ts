import { NextRequest, NextResponse } from "next/server";

import connect from "@/utils/db/mongodb-connect";
import getDataFromToken from "@/utils/helpers/get-data-from-token";

import Project from "@/models/project";
import User from "@/models/user";
import getUsersForProjects from "@/utils/helpers/get-users-for-projects";

export const GET = async (request: NextRequest) => {
  try {
    const userId = await getDataFromToken(request);

    await connect();
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

    console.log(projectsWithUsers, "projectWithUsers");
    return NextResponse.json({
      message: "Project fetched successfully",
      success: true,
      projectsWithUsers,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
