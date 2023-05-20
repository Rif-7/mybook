const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/fb/cb",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Access Token: " + accessToken);
      console.log("Profile :\n");
      console.log(profile);
      return done(null, { profile });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");
};
