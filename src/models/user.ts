import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

export default mongoose.models.User || mongoose.model("User", userSchema);