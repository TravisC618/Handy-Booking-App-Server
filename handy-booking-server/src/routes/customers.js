const express = require("express");
const validateId = require("../middleware/validateId");
const router = express.Router();

const {
  addCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  confirmTradie,
  deleteTradie
} = require("../controllers/customers");

router.post("/", addCustomer);
router.get("/:id", validateId, getCustomer);
router.get("/", getAllCustomers);
router.put("/:id", validateId, updateCustomer);
router.delete("/:id", validateId, deleteCustomer);
router.put("/:id/tradies/:tradieId", validateId, confirmTradie);
router.delete("/:id/tradies/:tradieId", validateId, deleteTradie);

module.exports = router;
