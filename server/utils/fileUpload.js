const cloudinary = require("cloudinary").v2;
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = async (file) => {
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
