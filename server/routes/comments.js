const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../utils/auth");
const commentController = require("../controllers/commentController");

router.get("/:postId", ensureAuth, commentController.getComments);
router.post("/:postId", ensureAuth, commentController.createComment);

module.exports = router;
