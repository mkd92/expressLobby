const express = require("express");
const httpStatus = require("http-status");

const {
  PropertyModel,
  UserModel,
  UnitModel,
} = require("../mongodb/model/userModel");

const router = express.Router();

router.get("/", (req, res, next) => {
  // res;
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
  // const user = UserModel.findById(req.user._id);

  const { prop_name, address } = req.body;
  const new_property = new PropertyModel({
    user_id: req.user._id,
    prop_name,
    address,
  });
  new_property.save().then((property) => {
    UserModel.findByIdAndUpdate(req.user._id, {
      $push: {
        properties: property._id,
      },
    });
  });
  res.send("Properties home page");
});
router.post("/:prop_id/create_unit", (req, res) => {
  const { unit_name, occupied } = req.body;
  const prop_id = req.params.prop_id;
  const user_id = req.user._id;
  const new_unit = new UnitModel({ unit_name, occupied, prop_id, user_id });
  new_unit.save().then((unit) => {
    UserModel.findByIdAndUpdate(user_id, {
      $push: {
        units: unit._id,
      },
    }).then((user) => user.save());
    PropertyModel.findByIdAndUpdate(prop_id, {
      $push: {
        units: unit._id,
      },
    }).then((property) => property.save());
    // TODO: handle error
    res.send("created");
  });
});
router.get("/:prop_id/units", (req, res) => {
  const prop_id = req.params.prop_id;
  PropertyModel.findById(prop_id)
    .populate("units")
    .exec(function (err, property) {
      if (err) {
        res.send({ error: err.message });
      }
      if (property) {
        const units = property.units;
        res.json({ units });
      }
    });
});

module.exports = router;
