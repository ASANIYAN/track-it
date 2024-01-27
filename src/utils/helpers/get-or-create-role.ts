import Role, { IRole } from "@/models/role";

const getOrCreateRole = async (roleData: { name: string }): Promise<IRole> => {
  try {
    const adminRole = await Role.findOne(roleData);
    if (adminRole) {
      console.log("role gotten successfully", adminRole);
      return adminRole;
    }

    const newAdminRole = new Role(roleData);
    const savedRole = await newAdminRole.save();

    console.log("Role created successfully:", savedRole);
    return savedRole; // Return the saved role
  } catch (error) {
    console.error("Error creating role:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export default getOrCreateRole;
