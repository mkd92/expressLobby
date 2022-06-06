const passport = require("passport");
const jwt = require("jsonwebtoken");
const { setRefreshToken } = require("../util/tokenUtils");

function loginController(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log(err);
      return res.status(400).json({
        message: "Something is not right",
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.status(400).json({
          message: "Something is not right1",
          user: user,
        });
      }
      //   console.log("user");
      const payload = { _id: user._id, iat: Date.now() };
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(payload, process.env.ACCESS_SECRET, {
        expiresIn: 300,
      });
      setRefreshToken(res, user._id);
      return res.json({ token, expires: Date.now() + 300 * 1000 });
    });
  })(req, res);
  //   next();
}

module.exports = loginController;
