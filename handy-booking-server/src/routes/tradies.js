const express = require("express");
const validateId = require("../middleware/validateId");
const router = express.Router();

const {
  addTradie,
  getTradie,
  getAllTradies,
  updateTradie,
  deleteTradie
} = require("../controllers/tradies");

router.post("/", addTradie);
router.get("/:id", validateId, getTradie);
router.get("/", getAllTradies);
router.put("/:id", validateId, updateTradie);
router.delete("/:id", validateId, deleteTradie);

module.exports = router;
