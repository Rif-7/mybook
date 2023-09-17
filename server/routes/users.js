const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const userController = require("../controllers/userController");
const { ensureAuth } = require("../utils/auth");

/* GET users listing. */
router.get("/", ensureAuth, userController.getUserList);
router.get("/user", ensureAuth, userController.getSignedUser);
router.put("/user", ensureAuth, userController.updateUserProfile);
router.get("/:userId", ensureAuth, userController.getUserInfo);
router.get("/:userId/posts", ensureAuth, postController.getUsersPosts);

module.exports = router;
