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

router.post("sign-up", userController.signUp);
router.post("login", userController.logIn);

module.exports = router;
