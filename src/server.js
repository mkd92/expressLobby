const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");

const authRoute = require("./router/authRoute");
require("dotenv").config();
const initializePassport = require("./passportConfig");

app = express();
initializePassport(passport);

app.use("/auth", authRoute);

app.listen(process.env.PORT, async () => {
  await mongoose
    .connect("mongodb://localhost:27017/lobby-express-auth")
    .then(() => {
      console.log("Mongodb connected");
      console.log(`Server started in port : ${process.env.PORT}`);
    })
    .catch((e) => {
      console.log(e);
    });
});
