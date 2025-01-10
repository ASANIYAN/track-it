import { IRole, Role } from "@/models/role";

interface RoleData {
  name: "admin" | "manager" | "member"; // strictly type the allowed role names
}

const getRole = async (roleData: RoleData): Promise<IRole> => {
  try {
    const role = await Role.findOne({ name: roleData.name });

    if (!role) {
      throw new Error(
        `Role '${roleData.name}' not found. Please ensure roles are properly seeded in the database.`
      );
    }

    return role;
  } catch (error) {
    console.error("Error in getRole:", error);
    throw error;
  }
};

export default getRole;
