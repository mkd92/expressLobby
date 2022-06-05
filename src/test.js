const { UserModel } = require("./mongodb/model/userModel");
const test = () => {
  const newUser = new UserModel({ username: "test1", password: "test" });
  newUser.save();
};

module.exports = test;
