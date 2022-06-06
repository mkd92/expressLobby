const { UserModel } = require("../mongodb/model/userModel");

module.exports = async ({ username, id }) => {
  if (username) {
    return await UserModel.findOne({ username });
  }
  return await UserModel.findById(id);
};
