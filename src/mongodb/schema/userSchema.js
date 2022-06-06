const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  properties: [
    {
      type: Schema.Types.ObjectId,
      ref: "Property",
    },
  ],
});
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 12, (err, hash) => {
    if (err) {
      throw err;
    }
    this.password = hash;
    next();
  });
});
// UserSchema.methods.generateJWT = () => {
//   return jwt.sign({ sub: this._id }, process.env.ACCESS_SECRET, {
//     expiresIn: 180,
//   });
// };
// UserSchema.methods.generateRefresh = () => {
//   return jwt.sign({ sub: this._id }, process.env.ACCESS_SECRET, {
//     expiresIn: "2d",
//   });
// };

module.exports = UserSchema;
