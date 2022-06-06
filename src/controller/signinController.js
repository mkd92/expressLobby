const status = require("http-status");
const checkUserController = require("./checkUserController");
const getUser = require("../util/getUser");
const { generateJWT, setRefreshToken } = require("../util/tokenUtils");
const { checkPassword } = require("../util/passwordUtils");

module.exports = async (req, res, next) => {
  const { username, password } = req.body;
  var user = await getUser({ username: username });
  //   console.log(user);
  if (!user) {
    res.status(status.BAD_REQUEST).send({ message: "User doesn't exist" });
    next();
  }
  await checkPassword(password, user.password).then((passwordMatch) => {
    if (!passwordMatch) {
      res
        .status(status.UNAUTHORIZED)
        .send({ message: "Entered Wrong Password" });
    } else {
      const access_token = generateJWT(user._id);
      setRefreshToken(res, user._id);
      res.status(status.OK).send(access_token);
    }
  });
  //
  next();
};
