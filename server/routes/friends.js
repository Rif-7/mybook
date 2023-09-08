const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { ensureAuth } = require("../utils/auth");

router.get("/", ensureAuth, userController.getUserFriendDetails);

// sent a friend request to the user with userId
router.post("/:userId/sent", ensureAuth, userController.sentFriendRequest);
router.post("/:userId/accept", ensureAuth, userController.acceptFriendRequest);
router.post(
  "/:userId/decline",
  ensureAuth,
  userController.declineFriendRequest
);
router.post("/:userId/cancel", ensureAuth, userController.cancelFriendRequest);
router.post("/:userId/remove", ensureAuth, userController.removeFriend);

module.exports = router;
