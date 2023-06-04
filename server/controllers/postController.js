const multer = require("multer");
const upload = multer({ dest: "../uploads" });
const uploadFile = require("../utils/fileUpload");
const Post = require("../models/post");

exports.createPost = [
  upload.single("image"),
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User is not authenticated" });
      }
      if (!req.body.text || req.body.text.length < 1) {
        return res.status(400).json({ errors: ["Post text is required"] });
      }

      let post = new Post({
        userId: req.user._id,
        text: req.body.text,
      });

      const imageFile = req.file;
      if (imageFile) {
        const uploadedFile = await uploadFile(imageFile.path);
        if (!uploadedFile.url) {
          return res
            .status(500)
            .json({ error: "Error occured while uploading the file" });
        }
        post.image = uploadedFile.url;
      }

      post = await post.save();
      return res.status(200).json({ post: post.id });
    } catch (err) {
      return next(err);
    }
  },
];
