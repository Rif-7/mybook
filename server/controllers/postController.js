const mongoose = require("mongoose");
const { uploadFile, deleteFile } = require("../utils/fileUpload");
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const fs = require("fs");
const { body, validationResult } = require("express-validator");

exports.createPost = [
  body("text")
    .isString()
    .withMessage("Invalid format")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Post caption should be between 2-100 characters"),
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

      const imageFile = req.files?.image;
      if (imageFile) {
        const uploadedFile = await uploadFile(imageFile.tempFilePath);
        if (!uploadedFile.url) {
          return res
            .status(500)
            .json({ error: "Error occured while uploading the image" });
        }
        post.image = uploadedFile.url;
        fs.unlinkSync(imageFile.tempFilePath);
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
    if (
      !req.params.userId ||
      !mongoose.Types.ObjectId.isValid(req.params.userId)
    ) {
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
    const posts = await Post.find({ userId: { $in: userFriends } })
      .sort({
        timestamp: -1,
      })
      .populate("userId", "firstName lastName profilePicUrl");
    return res.status(200).json({ posts });
  } catch (err) {
    return next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    if (
      !req.params.postId ||
      !mongoose.Types.ObjectId.isValid(req.params.postId)
    ) {
      return res.status(400).json({ error: "Post ID is missing" });
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (!req.user._id.equals(post.userId)) {
      return res
        .status(401)
        .json({ error: "User is unauthorized to delete this post" });
    }
    if (post.image) {
      deleteFile(post.image);
    }
    await Post.findByIdAndDelete(req.params.postId);
    await Comment.deleteMany({ postId: req.params.postId });

    return res.status(200).json({ success: "Post deleted successfully" });
  } catch (err) {
    return next(err);
  }
};

exports.toggleLike = async (req, res, next) => {
  try {
    if (
      !req.params.postId ||
      !mongoose.Types.ObjectId.isValid(req.params.postId)
    ) {
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
      message = "Post unliked successfully";
    } else {
      post.likes.push(req.user.id);
      message = "Post liked successfully";
    }
    await post.save();
    return res.status(200).json({ success: message });
  } catch (err) {
    return next(err);
  }
};
