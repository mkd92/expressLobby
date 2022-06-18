const { Schema } = require("mongoose");

const UnitSchema = new Schema({
  unit_name: {
    type: String,
    required: true,
  },
  occupied: {
    type: Boolean,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prop_id: {
    type: Schema.Types.ObjectId,
    ref: "Property",
  },
});
module.exports = UnitSchema;
