const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const { ensureAuth } = require("../utils/auth");

router.get("/", function (req, res, next) {
  res.redirect("/posts");
});

// Authentication Routes
router.get("/auth/fb", passport.authenticate("facebook", { session: false }));
router.get(
  "/auth/fb/cb",
  passport.authenticate("facebook", { session: false }),
  userController.sendJwtToken
);
router.post("/signup", userController.signup);
router.post("/login", userController.login);

// Post Routes
router.get("/posts", ensureAuth, postController.getPosts);
router.post("/posts", ensureAuth, postController.createPost);
router.post("/posts/:postId/like", ensureAuth, postController.toggleLike);

// Comment Routes
router.post(
  "/posts/:postId/comments",
  ensureAuth,
  commentController.createComment
);
router.get(
  "/posts/:postId/comments",
  ensureAuth,
  commentController.getComments
);
router.delete(
  "/posts/:postId/comments/:commentId",
  ensureAuth,
  commentController.deleteComment
);

module.exports = router;
