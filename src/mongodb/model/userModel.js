const { model } = require("mongoose");
const userSchema = require("../schema/userSchema");
const propertySchema = require("../schema/propertySchema");

const UserModel = model("User", userSchema);
const PropertyModel = model("Property", propertySchema);

module.exports = { UserModel, PropertyModel };
