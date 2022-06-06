const express = require("express");
const signupController = require("../controller/signupController");
const checkUserController = require("../controller/checkUserController");
const signinController = require("../controller/signinController");
const refreshTokenController = require("../controller/refreshTokenController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Auth home page");
});
router.post("/signup", signupController);
router.post("/signin", signinController);
router.get("/check", checkUserController);
router.get("/refresh_token", refreshTokenController);

module.exports = router;
