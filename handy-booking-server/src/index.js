require("dotenv").config();
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const routers = require("./routes");
const { connectToDB } = require("./utils/db");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json());

app.use("/api", routers);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listening PORT: ${PORT}`);
    });
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
