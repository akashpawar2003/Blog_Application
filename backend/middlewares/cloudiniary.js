import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export const uploadCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "Blog_App" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};



// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// export const uploadCloudinary = async (filePath) => {
//   try {
//     const result = await cloudinary.uploader.upload(filePath, { folder: "Blog_App" });
//     fs.unlinkSync(filePath);
//     return result;
//   } catch (error) {
//     fs.unlinkSync(filePath);
//     throw error;
//   }
// };

