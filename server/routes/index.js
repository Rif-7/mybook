var express = require("express");
const passport = require("passport");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({ hello: "There" });
});

router.get("/auth/fb", passport.authenticate("facebook"));
router.get(
  "/auth/fb/cb",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);

router.get("/profile", (req, res, next) => {
  return res.json(req.user);
});

module.exports = router;
