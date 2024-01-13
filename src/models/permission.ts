import mongoose, { Schema } from "mongoose";

const permissionSchema = new Schema({
  readPermission: { type: Boolean, default: true },
  writePermission: { type: Boolean, default: false },
  deletePermission: { type: Boolean, default: false },
});

export default mongoose.models.Permission ||
  mongoose.model("Permission", permissionSchema);
