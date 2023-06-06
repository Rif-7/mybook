const jwt = require("jsonwebtoken");
const path = require("path");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const Friend = require("../models/friend");
const { createHash, comparePassword } = require("../utils/auth");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// creates jwt token for users signed in using facebook
exports.sendJwtToken = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication failed" });
  }
  const payload = { sub: req.user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return res.status(200).json({ token });
};

exports.signup = [
  body("firstname", "Firstname is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("lastname", "Lastname is required").trim().isLength({ min: 1 }).escape(),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid Email")
    .escape()
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("Email already in use");
      }
    }),
  body("password", "Password should be atleast 6 characters")
    .trim()
    .isLength({ min: 6 })
    .escape(),

  async (req, res, next) => {
    try {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        errors = errors.formatWith((error) => error.msg);
        return res.status(400).json({ error: errors.array() });
      }

      const hashedPassword = await createHash(req.body.password);
      let user = new User({
        firstName: req.body.firstname,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      });
      user = await user.save();

      let friendDoc = new Friend({
        userId: user._id,
      });
      await friendDoc.save();

      const payload = {
        sub: user.id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      return res.status(200).json({ token });
    } catch (err) {
      return next(err);
    }
  },
];

exports.login = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid Email")
    .escape()
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      req.user = user;
    }),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should be atleast 6 characters")
    .escape()
    .custom(async (password, { req }) => {
      const isPassword = await comparePassword(password, req.user.password);
      if (!isPassword) {
        throw new Error("Incorrect Password");
      }
    }),
  async (req, res, next) => {
    try {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        errors = errors.formatWith((error) => error.msg);
        return res.status(400).json({ error: errors.array() });
      }

      const payload = {
        sub: req.user.id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      return res.status(200).json({ token });
    } catch (err) {
      return next(err);
    }
  },
];

exports.sentFriendRequest = async (req, res, next) => {
  try {
    // the reciever's id
    if (!req.params.userId) {
      return res.status(400).json({ error: "Invalid friend details" });
    }
    if (req.params.userId === req.user.id) {
      return res.status(400).json({ error: "Can sent friend request to self" });
    }

    const friendsFriendDoc = await Friend.findOneAndUpdate(
      { userId: req.params.userId },
      { $push: { requestRecieved: req.user.id } },
      { new: true }
    );
    if (!friendsFriendDoc) {
      return res.status(404).json({ error: "Friend not found" });
    }
    await Friend.findByIdAndUpdate(req.user.id, {
      $push: { requestSent: req.params.userId },
    });

    return res
      .status(200)
      .json({ success: "Friend request sent successfully " });
  } catch (err) {
    return next(err);
  }
};

exports.acceptFriendRequest = async (req, res, next) => {
  try {
    if (!req.params.userId) {
      return res.status(400).json({ error: "Invalid friend details" });
    }

    const friendDoc = await User.findById(req.params.userId);
    if (!friendDoc) {
      return res.status(404).json({ error: "Friend not found" });
    }
    const friendsFriendDoc = await friendDoc.friend_details;
    const hasSentRequest = friendsFriendDoc.requestSent.includes(req.user._id);
    if (!hasSentRequest) {
      return res
        .status(400)
        .json({ error: "The user has not sent a friend request" });
    }

    // Update Friends friend document
    friendsFriendDoc.requestSent.pull(req.user.id);
    friendsFriendDoc.friends.push(req.user.id);
    await friendsFriendDoc.save();

    await Friend.findOneAndUpdate(
      { userId: req.user.id },
      {
        $push: { friends: friendDoc.id },
        $pull: { requestRecieved: friendDoc.id },
      }
    );

    return res
      .status(200)
      .json({ success: "Friend request accepted successfully" });
  } catch (err) {
    return next(err);
  }
};
