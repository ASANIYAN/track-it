import mongoose, { Document, Schema } from "mongoose";

// Role Model
export interface IRole extends Document {
  name: string;
  _id: string;
  permissions: string[];
}

const allowedRoleNames = ["admin", "manager", "member"];

const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => allowedRoleNames.includes(value),
        message:
          "Invalid role name. Allowed values are admin, manager, or member.",
      },
    },
    permissions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Add the pre-validate middleware
roleSchema.pre("validate", function (next) {
  switch (this.name) {
    case "admin":
      this.permissions = [
        "create_task",
        "read_task",
        "update_task",
        "delete_task",
      ];
      break;
    case "manager":
      this.permissions = ["create_task", "read_task", "update_task"];
      break;
    case "member":
      this.permissions = ["read_task", "update_task"];
      break;
  }
  next();
});

// Delete the existing model if it exists (for development hot reloading)
const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);

export default Role;
