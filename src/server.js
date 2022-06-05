const express = require("express");
const authRoute = require("./router/auth-route");

require("dotenv").config();
app = express();

app.use("/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server started in port : ${process.env.PORT}`);
});
