import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  password?: string;
  isVerified: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
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
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
