import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY__API_SECRET,
  secure: true,
});

export const uploadSingleImageToCloudinary = async (file: string) => {
  try {
    if (!file) {
      return "";
    }
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "image",
      transformation: {
        width: 1200,
        height: 1200,
        crop: "fill",
      },
      folder: "trackIt_Profile_Images",
    });
    return result;
  } catch (error) {
    console.log("Cloudinary upload error:", error);
    throw new Error("Failed to upload image");
  }
};
