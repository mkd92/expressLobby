const { UserModel } = require("./mongodb/model/userModel");
require("dotenv").config();
const extractor = require("./extractor");

function initialize(passport) {
  var JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
  var opts = {};
  opts.jwtFromRequest = extractor("Authorization");
  opts.secretOrKey = process.env.ACCESS_SECRET;
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      console.log(jwt_payload);
      UserModel.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );
}

module.exports = initialize;
