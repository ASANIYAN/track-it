import { NextRequest, NextResponse } from "next/server";

import User from "@/models/user";
import Project from "@/models/project";
import connect from "@/utils/db/mongodb-connect";
import getDataFromToken from "@/utils/helpers/get-data-from-token";
import createRole from "@/utils/helpers/create-role";

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const { image, color, name, category, description } = Object.fromEntries(
      formData.entries()
    );
    // const image = formData.get("image");
    // const color = formData.get("color");
    // const name = formData.get("name");
    // const category = formData.get("category");
    // const description = formData.get("description");

    console.log(image, color, name, category, description, "formData");

    const userId = await getDataFromToken(request);
    console.log(userId, "userId");
    // await connect();

    // const user = await User.findOne({ _id: userId });

    // // check if user info gotten from user-id search exists
    // if (!user) {
    //   return NextResponse.json(
    //     { error: "Invalid or expired token. Please reauthenticate" },
    //     { status: 400 }
    //   );
    // }

    // if (!name)
    //   return NextResponse.json({ error: "name is required" }, { status: 400 });

    // if (!category)
    //   return NextResponse.json(
    //     { error: "category is required" },
    //     { status: 400 }
    //   );

    // // create admin role
    // const adminRole = await createRole({ name: "admin" });

    // // create a new project with user details, id from admin role in DB, and info[name, description...] gotten from request
    // const newProject = new Project({
    //   name,
    //   description,
    //   category,
    //   color,
    //   users: [{ user: user._id, role: adminRole._id }],
    // });

    // const savedProject = await newProject.save();

    // return NextResponse.json({
    //   message: "Project created successfully",
    //   success: true,
    //   savedProject,
    // });
  } catch (error: any) {
    console.log(error, "error");
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
