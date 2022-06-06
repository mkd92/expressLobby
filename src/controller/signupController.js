const status = require("http-status");
const { UserModel } = require("../mongodb/model/userModel");
const checkUsernameExists = require("../util/checkUsernameExists");

module.exports = async (req, res, next) => {
  const body = req.body;
  if (await checkUsernameExists(body.username)) {
    res.status(status.BAD_REQUEST).send({ message: "user exists" });
    next();
  } else if (body.password1 !== body.password2) {
    res.status(status.BAD_REQUEST).send({ message: "password mismatch" });
  } else {
    const newUser = new UserModel({
      username: body.username,
      password: body.password1,
    });
    newUser.save();
    res.status(status.CREATED).send({ message: "Success" });
    next();
  }
};
