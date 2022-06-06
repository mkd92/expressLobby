const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const PropertySchema = new Schema({
  prop_name: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  //   properties: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: "property",
  //     },
  //   ],
});
module.exports = PropertySchema;
