const express = require("express");
const router = express.Router();

const {
  getAllIncome,
  addIncome,
  updateIncome,
  deleteIncome,
} = require("../controllers/incomeController");

router.route("/").get(getAllIncome).post(addIncome);

router.route("/:incomeId").patch(updateIncome).delete(deleteIncome);

module.exports = router;
