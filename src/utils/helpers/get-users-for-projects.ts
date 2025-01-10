import { Types } from "mongoose";

import { ProjectDocument } from "@/models/project";
import { User, UserDocument } from "@/models/user";

const getUsersForProjects = async (projects: any) => {
  try {
    // Create copies of projects with updated users
    const updatedProjects = await Promise.all(
      projects.map(async (project: any) => {
        // Extract user IDs from the project
        const userIDs = project._doc.users.map((userRef: any) => userRef.user);

        // Query the User model to get user details
        const users: UserDocument[] = await User.find({
          _id: { $in: userIDs },
        });

        // Create a copy of the project and update the users array in the copy
        const updatedProject: any = { ...project._doc, users: [] };
        updatedProject.users = project._doc.users.map((userRef: any) => {
          const matchingUser = users.find((user) =>
            user._id.equals(userRef.user)
          );
          return matchingUser
            ? { user: matchingUser, role: userRef.role, _id: userRef._id }
            : userRef;
        });

        return updatedProject;
      })
    );

    return updatedProjects;
  } catch (error) {
    throw error;
  }
};

export default getUsersForProjects;
