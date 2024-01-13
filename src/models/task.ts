import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  assignedTo: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  dueDate: { type: Date, required: true },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  tag: { type: String, required: true },
  description: { type: String, required: true },
  subTasks: [{ type: String, required: true }],
  attachments: [
    {
      publicId: { type: String, required: true }, // Public ID from Cloudinary
      url: { type: String, required: true }, // URL from Cloudinary
    },
  ],
  taskComments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  permissions: { type: mongoose.Schema.Types.ObjectId, ref: "Permission" },
});

export default mongoose.models.Task || mongoose.model("Task", taskSchema);
