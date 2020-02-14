const express = require("express");
const router = express.Router();

const { addUser } = require("../controllers/users");
const validateAuth = require("../middleware/validateAuth");

router.post("/", validateAuth, addUser);

module.exports = router;
