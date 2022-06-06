const { UserModel } = require("../mongodb/model/userModel");

module.exports = async (username) => {
  const user = await UserModel.findOne({ username }).exec();
  if (user) return true;
  return false;
};
