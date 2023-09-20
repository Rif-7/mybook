const passport = require("passport");
const passportJWT = require("passport-jwt");
const FacebookStrategy = require("passport-facebook");
const path = require("path");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Friend = require("../models/friend");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const JWTOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStrategy(JWTOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findOne({ _id: jwtPayload.sub });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.SERVER_HOST}/auth/fb/cb`,
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
          user = await user.save();

          // Creating friend doc to store friend details
          const friendDoc = new Friend({
            userId: user.id,
          });
          await friendDoc.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

exports.createHash = async (password) => {
  return await bcrypt.hash(password, 10);
};

exports.comparePassword = async (password, hashedPassword) => {
  const res = await bcrypt.compare(password, hashedPassword);
  return !!res;
};

exports.ensureAuth = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info, status) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: "User is not authenticated" });
    }
    req.user = user;
    return next();
  })(req, res, next);
};
