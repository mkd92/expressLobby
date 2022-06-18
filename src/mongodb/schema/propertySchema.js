const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const PropertySchema = new Schema({
  prop_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  units: [
    {
      type: Schema.Types.ObjectId,
      ref: "Unit",
    },
  ],
});
module.exports = PropertySchema;
