import mongoose, { Schema } from "mongoose";
import generateRandomColor from "@/utils/helpers/generate-random-colors";

const projectSchema = new Schema({
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
    default: generateRandomColor(), // sets a random color as the default
  },
  privacy: {
    type: String,
    enum: ["Private to me", "Private to project members", "Public"],
    default: "Private to me",
    required: true,
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  permissions: { type: mongoose.Schema.Types.ObjectId, ref: "Permission" },
  users: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      role: { type: String, required: true },
    },
  ],
});

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
