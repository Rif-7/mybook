const cloudinary = require("cloudinary").v2;
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadFile = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
  } catch (err) {
    console.log(err);
    return {};
  }
};

exports.deleteFile = async (url) => {
  try {
    const publicId = extractPublicIdFromUrl(url);
    if (!publicId) return;
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (err) {
    return null;
  }
};

function extractPublicIdFromUrl(url) {
  try {
    const parts = url.split("/");
    const filename = parts.pop(); // Get the last part of the URL (the filename)
    const publicId = filename.split(".")[0]; // Remove the file extension

    return publicId;
  } catch (error) {
    return null;
  }
}
