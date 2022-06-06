const httpStatus = require("http-status");

const logoutController = (req, res, next) => {
  res.clearCookie("refresh_token");
  res.status(httpStatus.OK).send({ message: "Logged out" });
};

module.exports = logoutController;
