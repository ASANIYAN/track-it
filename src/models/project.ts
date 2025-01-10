import mongoose, { Schema, Types } from "mongoose";

import generateRandomColor from "@/utils/helpers/generate-random-colors";

// Project Model
interface UserRef {
  user: Types.ObjectId;
  role: Types.ObjectId;
}

interface Image {
  id?: string;
  url?: string;
}

export interface ProjectDocument extends Document {
  name: string;
  description?: string;
  category:
    | "Design"
    | "Development"
    | "Marketing"
    | "Operations"
    | "Education"
    | "Sales"
    | "HR"
    | "IT"
    | "Engineering";
  color: string;
  image?: Image;
  favourite: boolean;
  tasks: Types.ObjectId[];
  users: UserRef[];
  createdBy: Types.ObjectId;
}

const projectSchema = new Schema<ProjectDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: [
        "Design",
        "Development",
        "Marketing",
        "Operations",
        "Education",
        "Sales",
        "HR",
        "IT",
        "Engineering",
      ],
      default: "Design",
      required: true,
    },
    color: {
      type: String,
      default: generateRandomColor(),
    },
    image: {
      id: { type: String },
      url: { type: String },
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    users: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role",
          required: true,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
