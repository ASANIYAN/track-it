import mongoose, { Schema } from "mongoose";

const allowedRoleNames = ["admin", "manager", "member"];

// Custom validator for the 'name' field
const validateRoleName = (value: string) => {
  return allowedRoleNames.includes(value);
};

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validateRoleName,
      message:
        "Invalid role name. Allowed values are admin, manager, or member.",
    },
  },
  permissions: {
    type: [String],
    default: [],
  },
});

// Automatically set permissions based on the role name
roleSchema.pre("validate", function (next) {
  if (this.name === "admin") {
    this.permissions = [
      "create_task",
      "read_task",
      "update_task",
      "delete_task",
    ];
  } else if (this.name === "manager") {
    this.permissions = ["create_task", "read_task", "update_task"];
  } else if (this.name === "member") {
    this.permissions = ["read_task", "update_task"];
  }
  next();
});

export default mongoose.models.Role || mongoose.model("Role", roleSchema);
