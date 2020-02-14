require("dotenv").config();
const express = require("express");
require("express-async-errors");
const app = express();
const routers = require("./routes");
const { connectToDB } = require("./utils/db");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());

app.use("/api", routers);
app.use(errorHandler);

connectToDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("server listening");
    });
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
