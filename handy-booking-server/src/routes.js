const express = require("express");
const router = express.Router();
const customerRoute = require("./routes/customers");
const tradieRoute = require("./routes/tradies");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const authGuard = require("./middleware/authGuard");

router.use("/customers", authGuard, customerRoute);
router.use("/tradies", authGuard, tradieRoute);
router.use("/users", userRoute);
router.use("/auth", authRoute);

module.exports = router;
