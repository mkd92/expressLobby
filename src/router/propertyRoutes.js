const express = require("express");
const httpStatus = require("http-status");

const { PropertyModel, UserModel } = require("../mongodb/model/userModel");

const router = express.Router();

router.get("/", (req, res, next) => {
  UserModel.findById(req.user._id)
    .populate("properties")
    .exec(function (err, user) {
      if (err) {
        //     // console.log("error");
        res.send({ error: err.message });
      }
      if (user) {
        const { _id, username, properties } = user;
        res.json({ _id, username, properties });
      }
    });
  // next();
});
router.get("/user", async (req, res) => {
  const userData = await UserModel.findById(req.user._id).exec();
  res.send(userData.toJSON());
});
router.post("/create", (req, res) => {
  const user = UserModel.findById(req.user._id);

  const { prop_name, address } = req.body;
  const new_property = new PropertyModel({
    prop_name,
    address,
  });
  new_property.save().then((property) =>
    UserModel.findByIdAndUpdate(req.user._id, {
      $push: {
        properties: property._id,
      },
    })
  );
  res.send("Properties home page");
});

module.exports = router;
