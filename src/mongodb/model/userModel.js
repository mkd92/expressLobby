const { model } = require("mongoose");
const userSchema = require("../schema/userSchema");
const propertySchema = require("../schema/propertySchema");
const unitSchema = require("../schema/unitSchema");

const UserModel = model("User", userSchema);
const PropertyModel = model("Property", propertySchema);
const UnitModel = model("Unit", unitSchema);

module.exports = { UserModel, PropertyModel, UnitModel };
