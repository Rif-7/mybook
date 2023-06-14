const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { ensureAuth } = require("../utils/auth");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/:userId/posts", ensureAuth, postController.getUsersPosts);

module.exports = router;
