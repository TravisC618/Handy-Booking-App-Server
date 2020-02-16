const express = require("express");
const validateId = require("../middleware/validateId");
const router = express.Router();

const { addTask } = require("../controllers/tasks");

router.post("/:id", validateId, addTask);

module.exports = router;
