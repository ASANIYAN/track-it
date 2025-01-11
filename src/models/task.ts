import mongoose, { Schema } from "mongoose";

// Task Model
export const taskSchema = new Schema(
  {
    name: { type: String, required: true },
    textColor: { type: String, required: true },
    backgroundColor: { type: String, required: true },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["TODO", "IN-PROGRESS", "COMPLETED"],
      default: "TODO",
    },
    permissions: {
      read: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
      write: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
      delete: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
    },
  },
  { timestamps: true }
);

export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
