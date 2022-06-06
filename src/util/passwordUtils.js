const bcrypt = require("bcrypt");

const checkPassword = async (password, hashedPassword) => {
  const value = await bcrypt.compareSync(password, hashedPassword);
  return value;
};

module.exports = { checkPassword };
