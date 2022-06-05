const { Schema } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});

module.exports = UserSchema;
