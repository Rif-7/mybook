const jwt = require("jsonwebtoken");
const path = require("path");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
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
