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
  return res.redirect(`${process.env.CLIENT_HOST}/token/${token}`);
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
        lastName: req.body.lastname,
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

exports.getSignedUser = async (req, res, next) => {
  try {
    return res.status(200).json({
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      profilePicUrl: req.user.profilePicUrl,
      email: req.user.email,
      id: req.user.id,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getUserInfo = async (req, res, next) => {
  try {
    if (!req.params.userId) {
      return res.status(400).json({ error: "User ID is missing" });
    }
    const user = await User.findById(req.params.id).select(
      "firstName lastName profilePicUrl"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

exports.sentFriendRequest = async (req, res, next) => {
  try {
    // the reciever's id
    if (!req.params.userId) {
      return res.status(400).json({ error: "Friend ID is missing" });
    }
    if (req.params.userId === req.user.id) {
      return res.status(400).json({ error: "Can sent friend request to self" });
    }

    const friendsFriendDoc = await Friend.findOne({
      userId: req.params.userId,
    });

    if (!friendsFriendDoc) {
      return res.status(404).json({ error: "Friend not found" });
    }

    const hasAlreadySentRequest =
      friendsFriendDoc.requestSent.includes(req.user.id) ||
      friendsFriendDoc.requestRecieved.includes(req.user.id) ||
      friendsFriendDoc.friends.includes(req.user.id);

    if (hasAlreadySentRequest) {
      return res.status(400).json({
        error: "User has already sent a request or are already friends",
      });
    }

    friendsFriendDoc.requestRecieved.push(req.user.id);
    await friendsFriendDoc.save();

    // Update user's friend document
    await Friend.findOneAndUpdate(
      { userId: req.user.id },
      {
        $push: { requestSent: req.params.userId },
      }
    );

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
      return res.status(400).json({ error: "Friend ID is missing" });
    }

    const friendDoc = await User.findById(req.params.userId);
    if (!friendDoc) {
      return res.status(404).json({ error: "Friend not found" });
    }
    const friendsFriendDoc = await friendDoc.friend_details;
    const hasSentRequest = friendsFriendDoc.requestSent.includes(req.user.id);
    if (!hasSentRequest) {
      return res
        .status(400)
        .json({ error: "The user has not sent a friend request" });
    }

    // Update Friend's friend document
    friendsFriendDoc.requestSent.pull(req.user.id);
    friendsFriendDoc.friends.push(req.user.id);
    await friendsFriendDoc.save();

    // Update user's friend document
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

exports.declineFriendRequest = async (req, res, next) => {
  try {
    if (!req.params.userId) {
      return res.status(400).json({ error: "Friend ID is missing" });
    }

    const friendDoc = await User.findById(req.params.userId);
    if (!friendDoc) {
      return res.status(404).json({ error: "Friend not found" });
    }
    const friendsFriendDoc = await friendDoc.friend_details;
    const hasSentRequest = friendsFriendDoc.requestSent.includes(req.user.id);
    if (!hasSentRequest) {
      return res
        .status(400)
        .json({ error: "The user has not sent a friend request" });
    }

    // update friend's document
    friendsFriendDoc.requestSent.pull(req.user.id);
    await friendsFriendDoc.save();
    // update user's document
    await Friend.findOneAndUpdate(
      { userId: req.user.id },
      {
        $pull: { requestRecieved: req.params.userId },
      }
    );

    return res
      .status(200)
      .json({ success: "Friend request declined successfully" });
  } catch (err) {
    return next(err);
  }
};

exports.cancelFriendRequest = async (req, res, next) => {
  try {
    if (!req.params.userId) {
      return res.status(400).json({ error: "Friend ID is missing" });
    }

    const friendDoc = await User.findById(req.params.userId);
    if (!friendDoc) {
      return res.status(404).json({ error: "Friend not found" });
    }
    const friendsFriendDoc = await friendDoc.friend_details;
    const hasSentRequest = friendsFriendDoc.requestRecieved.includes(
      req.user.id
    );
    if (!hasSentRequest) {
      return res
        .status(400)
        .json({ error: "The user has not sent a friend request" });
    }

    // update friend's document
    friendsFriendDoc.requestRecieved.pull(req.user.id);
    await friendsFriendDoc.save();
    // update user's document
    await Friend.findOneAndUpdate(
      { userId: req.user.id },
      {
        $pull: { requestSent: req.params.userId },
      }
    );
  } catch (err) {
    return next(err);
  }
};

exports.removeFriend = async (req, res, next) => {
  try {
    if (!req.params.userId) {
      return res.status(400).json({ error: "Friend ID is missing" });
    }

    // remove from users friends doc
    await Friend.findOneAndUpdate(
      { userId: req.user.id },
      {
        $pull: { friends: req.params.userId },
      }
    );
    // remove from friend's friends doc
    await Friend.findOneAndUpdate(
      { userId: req.params.userId },
      {
        $pull: { friends: req.user.id },
      }
    );

    return res.status(200).json({ success: "Friend removed successfully" });
  } catch (err) {
    return next(err);
  }
};

exports.getUserFriendDetails = async (req, res, next) => {
  try {
    const queryField = "firstName lastName profilePicUrl";
    const friendDetails = await Friend.findOne({ userId: req.user.id })
      .populate("requestSent", queryField)
      .populate("requestRecieved", queryField)
      .populate("friends", queryField);
    return res.status(200).json(friendDetails);
  } catch (err) {
    return next(err);
  }
};

exports.getUserList = async (req, res, next) => {
  try {
    const friendDetails = await req.user.friend_details;
    const excludedUsers = [
      req.user._id,
      ...friendDetails.friends,
      ...friendDetails.requestRecieved,
      ...friendDetails.requestSent,
    ];
    const users = await User.find({ _id: { $nin: excludedUsers } }).select(
      "firstName lastName profilePicUrl"
    );
    return res.status(200).json({ users });
  } catch (err) {
    return next(err);
  }
};
