const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/userController");

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

router.get("/profile", (req, res, next) => {
  return res.json({ page: "profile" });
});

module.exports = router;
