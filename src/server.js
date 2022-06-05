const express = require("express");
require("dotenv").config();

app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server started in port : ${process.env.PORT}`);
});
