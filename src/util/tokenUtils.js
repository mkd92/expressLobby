const jwt = require("jsonwebtoken");
require("dotenv").config();
const dayjs = require("dayjs");
const getUser = require("./getUser");

const generateJWT = (id) => {
  return {
    access_token: jwt.sign({ _id: id }, process.env.ACCESS_SECRET, {
      expiresIn: 300,
    }),
    expires: Date.now(),
  };
};

const generateRefresh = (id) => {
  return jwt.sign({ _id: id, iat: Date.now() }, process.env.REFRESH_SECRET, {
    expiresIn: "2d",
  });
  //   return jwt.sign({ sub: id }, process.env.REFRESH_SECRET, {
  //     expiresIn: "2d",
  //   });
};

const setRefreshToken = (res, id) => {
  refreshToken = generateRefresh(id);
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    expires: dayjs().add(2, "days").toDate(),
  });
};

const generateAccessFromRefresh = async (token) => {
  const payload = jwt.verify(token, process.env.REFRESH_SECRET);
  const _id = payload._id;
  if (_id) {
    user = await getUser({ id: _id });
    // console.log(user);
    if (user) {
      return generateJWT(user._id);
    }
  }
  return null;
};
module.exports = {
  generateJWT,
  generateRefresh,
  setRefreshToken,
  generateAccessFromRefresh,
};
