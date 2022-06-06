const status = require("http-status");
const { UserModel } = require("../mongodb/model/userModel");
const checkUsernameExists = require("../util/checkUsernameExists");

module.exports = (req, res, next) => {
  const body = req.body;
  const value = checkUsernameExists(body.username);
  res.send(value, status.CREATED);
  next();
};
