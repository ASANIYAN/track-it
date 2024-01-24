import Role, { IRole } from "@/models/role";

const createRole = async (roleData: { name: string }): Promise<IRole> => {
  try {
    // save the role to the database
    const newRole = new Role(roleData);
    const savedRole = await newRole.save();

    console.log("Role created successfully:", savedRole);
    return savedRole; // Return the saved role
  } catch (error) {
    console.error("Error creating role:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export default createRole;
