const { model } = require("mongoose");
const userSchema = require("../schema/userSchema");

const UserModel = model("User", userSchema);

module.exports = { UserModel };
