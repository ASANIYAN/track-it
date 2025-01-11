// app/api/projects/[projectId]/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db/mongodb-connect";
import { Project } from "@/models/project";
import { User } from "@/models/user";
import Role from "@/models/role"; // Import the Role model
import getDataFromToken from "@/utils/helpers/get-data-from-token";

export const GET = async (
  request: NextRequest,
  { params }: { params: { projectId: string } }
) => {
  try {
    await connect();

    // Explicitly query the Role model to ensure it's being used
    const roles = await Role.find({});

    // Get user ID from token for authorization
    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectId } = params;
    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    // First, get the project and its users
    const project = await Project.findById(projectId).populate({
      path: "users.role",
      select: "name permissions",
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Check if requesting user is part of the project
    const isUserInProject = project.users.some(
      (userRef: { user: { toString: () => any } }) =>
        userRef.user.toString() === userId
    );

    if (!isUserInProject) {
      return NextResponse.json(
        { error: "You don't have access to this project" },
        { status: 403 }
      );
    }

    // Get all user IDs from the project
    const userIds = project.users.map((userRef: { user: any }) => userRef.user);

    // Get full user information excluding isVerified
    const userDetails = await User.find({ _id: { $in: userIds } })
      .select("email projects") // Selecting specific fields
      .populate({
        path: "projects.project",
        select: "name description category color favourite",
      })
      .populate({
        path: "projects.role",
        select: "name permissions",
      });

    // Combine user details with their roles from the project
    const projectUsers = project.users.map(
      (userRef: { user: { toString: () => any }; role: any }) => {
        const userDetail = userDetails.find(
          (user) => user._id.toString() === userRef.user.toString()
        );

        return {
          user: userDetail,
          projectRole: userRef.role, // renamed to projectRole for clarity
        };
      }
    );

    console.log(projectUsers, "project users");

    return NextResponse.json({
      message: "Project users retrieved successfully",
      users: projectUsers,
    });
  } catch (error: any) {
    console.error("Error getting project users:", error);
    return NextResponse.json(
      { error: error.message || "Error retrieving project users" },
      { status: 500 }
    );
  }
};
