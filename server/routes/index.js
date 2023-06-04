const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const { ensureAuth } = require("../utils/auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({ page: "home" });
});

router.get("/auth/fb", passport.authenticate("facebook", { session: false }));
router.get(
  "/auth/fb/cb",
  passport.authenticate("facebook", { session: false }),
  userController.sendJwtToken
);

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.post("/posts", ensureAuth, postController.createPost);

module.exports = router;
