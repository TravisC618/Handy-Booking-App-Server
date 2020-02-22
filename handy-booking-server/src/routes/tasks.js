const express = require("express");
const validateId = require("../middleware/validateId");
const router = express.Router();

const { addTask, getAllTasks, getTask } = require("../controllers/tasks");

router.get("/", getAllTasks);
router.get("/:id", validateId, getTask);
router.post("/customers/:customerId", validateId, addTask);

module.exports = router;
