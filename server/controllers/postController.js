const multer = require("multer");
const upload = multer({ dest: "../uploads" });
const uploadFile = require("../utils/fileUpload");
const Post = require("../models/post");
const User = require("../models/user");

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
      return res.status(400).json({ error: "Invalid user details" });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const posts = await Post.find({ userId: user.id }).sort({ timestamp: -1 });
    return res.status(200).json(posts);
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
      return res.status(400).json({ error: "Invalid post details" });
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
