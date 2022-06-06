// third party libraries
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
// dotenv
require("dotenv").config();
const status = require("http-status");
const cookieParser = require("cookie-parser");
// file imports
const authRoute = require("./router/authRoute");
const initializePassport = require("./passportConfig");
const test = require("./test");
const propertyRoutes = require("./router/propertyRoutes");

// initialize express
app = express();
// initialize passport js
initializePassport(passport);
app.use(passport.initialize());
// use json parser
app.use(cookieParser());
app.use(express.json());
// request logger
app.use((req, res, next) => {
  console.log(`Request ${req.url}: Method ${req.method}`);
  next();
});

// adding auth routes
app.use("/auth", authRoute);
app.use(
  "/properties",
  passport.authenticate("jwt", { session: false }),
  propertyRoutes
);
// response logger
app.use((req, res, next) => {
  console.log(`Response Status: ${res.statusCode} ${status[res.statusCode]}`);
  next();
});
// listening to server and mongodb connected
app.listen(process.env.PORT, async () => {
  await mongoose
    .connect("mongodb://localhost:27017/lobby-express-auth")
    .then(() => {
      console.log("Mongodb connected");
      console.log(`Server started in port : ${process.env.PORT}`);
      //   test();
    })
    .catch((e) => {
      console.log(e);
    });
});
