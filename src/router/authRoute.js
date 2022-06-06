const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const signupController = require("../controller/signupController");
const checkUserController = require("../controller/checkUserController");
const signinController = require("../controller/signinController");
const refreshTokenController = require("../controller/refreshTokenController");
require("dotenv").config();
const loginController = require("../controller/loginController");
const logoutController = require("../controller/logoutController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Auth home page");
});
router.post("/signup", signupController);
// router.post("/signin", signinController);
router.post("/login", loginController);
// router.get("/check", checkUserController);
router.get("/refresh_token", refreshTokenController);
router.post("/logout", logoutController);

module.exports = router;
