const express = require("express");
const { PropertyModel, UserModel } = require("../mongodb/model/userModel");

const router = express.Router();

router.get("/", async (req, res) => {
  const userWProperty = await UserModel.findById(req.user._id)
    .populate("properties")
    .exec();
  console.log(userWProperty);
  res.send(userWProperty.toJSON());
});
router.post("/create", (req, res) => {
  const { prop_name, address } = req.body;
  // console.log(req.user);
  // console.log(res.body)
  const new_property = new PropertyModel({
    prop_name,
    address,
    user_id: req.user._id,
  });
  new_property.save();
  res.send("Properties home page");
});

module.exports = router;
