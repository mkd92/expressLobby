const httpStatus = require("http-status");

const logoutController = (req, res, next) => {
  console.log("logout");
  req.logout(function (err) {
    // TODO: Error handling
    res.clearCookie("refresh_token");
    res.status(httpStatus.OK).send({ message: "Logged out" });
  });
};

module.exports = logoutController;
