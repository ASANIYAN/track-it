import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db/mongodb-connect";
import getDataFromToken from "@/utils/helpers/get-data-from-token";
import { uploadSingleImageToCloudinary } from "@/utils/helpers/cloudinary";
import { User } from "@/models/user";
import { Project } from "@/models/project";
import getRole from "@/utils/helpers/get-or-create-role";

export const POST = async (request: NextRequest) => {
  try {
    const { image, color, name, category, description } = await request.json();

    // Validate required fields
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!category) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    // Connect to database and get user
    await connect();
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token. Please reauthenticate" },
        { status: 400 }
      );
    }

    // Upload image if provided
    const imageFromCloudinary = image
      ? await uploadSingleImageToCloudinary(image)
      : null;

    // Get admin role
    const adminRole = await getRole({ name: "admin" });

    // Create project
    const newProject = new Project({
      name,
      description,
      category,
      color,
      createdBy: userId,
      users: [{ user: user._id, role: adminRole._id }], // Use adminRole._id instead of adminRole
      image: imageFromCloudinary
        ? {
            id: imageFromCloudinary.public_id,
            url: imageFromCloudinary.secure_url,
          }
        : undefined,
    });

    const savedProject = await newProject.save();

    // Update user's projects array with proper role reference
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          projects: {
            project: savedProject._id,
            role: adminRole._id, // Use adminRole._id instead of adminRole.name
          },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      // If user update fails, delete the created project to maintain consistency
      await Project.findByIdAndDelete(savedProject._id);
      return NextResponse.json(
        { error: "Failed to update user with new project" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Project created successfully",
      success: true,
      project: savedProject,
    });
  } catch (error: any) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: error.message || "Error creating project" },
      { status: 500 }
    );
  }
};
