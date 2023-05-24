const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const path = require("path");
const User = require("../models/user");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/fb/cb",
      profileFields: [
        "id",
        "displayName",
        "email",
        "first_name",
        "last_name",
        "picture.type(large)",
      ],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id, emails, name, photos } = profile;
        const firstName = name.givenName;
        const lastName = name.familyName;
        const email = emails ? emails[0].value : null;
        const profilePicUrl = photos ? photos[0].value : null;

        let user = await User.findOne({ facebookId: id });

        if (user) {
          user.accessToken = accessToken;
          user.profilePicUrl = profilePicUrl;
          await user.save();
        } else {
          user = new User({
            firstName,
            lastName,
            email,
            profilePicUrl,
            facebookId: id,
          });
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
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
