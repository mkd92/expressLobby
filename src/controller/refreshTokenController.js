const status = require("http-status");

const { generateAccessFromRefresh } = require("../util/tokenUtils");

module.exports = async (req, res, next) => {
  const refreshToken = req.cookies.refresh_token;
  if (refreshToken) {
    const access_token = await generateAccessFromRefresh(refreshToken);
    if (access_token) {
      res.status(status.OK).send(access_token);
    }
  }
  next();
};
