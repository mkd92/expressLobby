const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

const { UserModel } = require("./mongodb/model/userModel");
require("dotenv").config();
const extractor = require("./extractor");
const passportJWT = require("passport-jwt");
const passwordUtils = require("./util/passwordUtils");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

function initialize(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      function (username, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return UserModel.findOne({ username })
          .then((user) => {
            if (!user) {
              return cb(null, false, {
                message: "Incorrect username.",
              });
            }
            if (!passwordUtils.checkPassword(password, user.password)) {
              return cb(null, false, {
                message: "Incorrect password.",
              });
            }
            return cb(null, user, { message: "Logged In Successfully" });
          })
          .catch((err) => cb(err));
      }
    )
  );
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.ACCESS_SECRET,
      },
      function (jwtPayload, cb) {
        // console.log(jwtPayload);
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return UserModel.findById(jwtPayload._id)
          .then((user) => {
            return cb(null, user);
          })
          .catch((err) => {
            return cb(err);
          });
      }
    )
  );
}

module.exports = initialize;
