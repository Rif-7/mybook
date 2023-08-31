const multer = require("multer");
const upload = multer({ dest: "../uploads" });
const uploadFile = require("../utils/fileUpload");
const Post = require("../models/post");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.createPost = [
  upload.single("image"),
  body("text", "Post text is required").trim().isLength({ min: 1 }).escape(),
  async (req, res, next) => {
    try {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        errors = errors.formatWith((error) => error.msg);
        return res.status(400).json({ error: errors.array()[0] });
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
            .json({ error: "Error occured while uploading the image" });
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

exports.getUsersPosts = async (req, res, next) => {
  try {
    if (!req.params.userId) {
      return res.status(400).json({ error: "User ID is missing" });
    }
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const posts = await Post.find({ userId: user.id }).sort({ timestamp: -1 });
    return res.status(200).json({ posts });
  } catch (err) {
    return next(err);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    let userFriends = await req.user.friend_details;
    userFriends = userFriends.friends;
    userFriends.push(req.user.id);
    const posts = await Post.find({ userId: { $in: userFriends } }).sort({
      timestamp: -1,
    });
    return res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
};

// TODO: Might have to implement comment models before deletePost
exports.deletePost = () => {};

exports.toggleLike = async (req, res, next) => {
  try {
    if (!req.params.postId) {
      return res.status(400).json({ error: "Post ID is missing" });
    }
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const hasLiked = post.likes.includes(req.user.id);

    let message;
    if (hasLiked) {
      post.likes.pull(req.user.id);
      message = "Post liked successfully";
    } else {
      post.liked.push(req.user.id);
      message = "Post unliked successfully";
    }
    await post.save();
    return res.status(200).json({ success: message });
  } catch (err) {
    return next(err);
  }
};
