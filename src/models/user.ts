// User Model
import { Document, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  password?: string;
  isVerified: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
  projects?: Array<{ project: Types.ObjectId; role: Types.ObjectId }>;
}

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    projects: [
      {
        project: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
        },
        role: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role",
        },
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
