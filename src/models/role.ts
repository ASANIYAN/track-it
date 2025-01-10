import mongoose, { Schema } from "mongoose";

// Role Model
export interface IRole extends Document {
  name: string;
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

export const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);
