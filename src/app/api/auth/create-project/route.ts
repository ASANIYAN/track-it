import { NextRequest, NextResponse } from "next/server";

import User from "@/models/user";
import Project from "@/models/project";
import connect from "@/utils/db/mongodb-connect";
import getDataFromToken from "@/utils/helpers/get-data-from-token";
import getOrCreateRole from "@/utils/helpers/get-or-create-role";
import { uploadSingleImageToCloudinary } from "@/utils/helpers/cloudinary";

export const POST = async (request: NextRequest) => {
  try {
    const { image, color, name, category, description } = await request.json();
    const imageFromCloudinary = await uploadSingleImageToCloudinary(image);

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

    if (!name)
      return NextResponse.json({ error: "name is required" }, { status: 400 });

    if (!category)
      return NextResponse.json(
        { error: "category is required" },
        { status: 400 }
      );

    // create admin role
    const adminRole = await getOrCreateRole({ name: "admin" });

    // create a new project with user details, id from admin role in DB, and info[name, description...] gotten from request
    const newProject = new Project({
      name,
      description,
      category,
      color,
      users: [{ user: user._id, role: adminRole._id }],
      image: {
        id: imageFromCloudinary ? imageFromCloudinary.public_id : "",
        url: imageFromCloudinary ? imageFromCloudinary.secure_url : "",
      },
    });

    const savedProject = await newProject.save();

    return NextResponse.json({
      message: "Project created successfully",
      success: true,
      savedProject,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
