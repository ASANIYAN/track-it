import { NextRequest, NextResponse } from "next/server";

import connect from "@/utils/db/mongodb-connect";
import getDataFromToken from "@/utils/helpers/get-data-from-token";

import Project from "@/models/project";
import User from "@/models/user";
import getUsersForProjects from "@/utils/helpers/get-users-for-projects";
import {
  deleteSingleImageFromCloudinary,
  uploadSingleImageToCloudinary,
} from "@/utils/helpers/cloudinary";

export const PUT = async (request: NextRequest) => {
  try {
    const { id, image, color, name, category, description } =
      await request.json();
    // console.log(id, image, color, name, category, description, "from frontend");

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

    // check for image input
    if (image) {
      const existingProject = await Project.findById(id);
      const imagePublicId = existingProject?.image?.id; // check if existing project has image by getting image id
      if (imagePublicId) {
        await deleteSingleImageFromCloudinary(imagePublicId); // delete existing image if image from cloudinary
        const imageFromCloudinary = await uploadSingleImageToCloudinary(image); // upload new image to cloudinary
        const updatedProject = await Project.findByIdAndUpdate(
          id,
          {
            name,
            description,
            category,
            color,
            image: {
              id: imageFromCloudinary ? imageFromCloudinary.public_id : "",
              url: imageFromCloudinary ? imageFromCloudinary.secure_url : "",
            },
          },
          { new: true }
        );
        return NextResponse.json({
          message: "Project updated successfully",
          success: true,
          updatedProject,
        });
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        name,
        description,
        category,
        color,
      },
      { new: true }
    );

    return NextResponse.json({
      message: "Project updated successfully",
      success: true,
      updatedProject,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
