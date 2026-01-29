import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const uploadCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder: "Blog_App" });
    fs.unlinkSync(filePath);
    return result;
  } catch (error) {
    fs.unlinkSync(filePath);
    throw error;
  }
};

