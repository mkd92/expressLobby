const jwt = require("jsonwebtoken");
require("dotenv").config();
const dayjs = require("dayjs");
const getUser = require("./getUser");

const generateJWT = (id) => {
  return {
    access_token: jwt.sign({ sub: id }, process.env.ACCESS_SECRET, {
      expiresIn: 300,
    }),
    exp: dayjs().add(5, "minutes").toDate(),
  };
};

const generateRefresh = (id) => {
  return jwt.sign({ sub: id }, process.env.REFRESH_SECRET, {
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
  const payload = await jwt.verify(token, process.env.REFRESH_SECRET);
  if (payload.sub) {
    const userId = payload.sub;
    user = await getUser({ id: userId });
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
