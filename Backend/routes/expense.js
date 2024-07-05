const express = require("express");
const router = express.Router();

const {
  getAllExpense,
  addExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

router.route("/").get(getAllExpense).post(addExpense);

router.route("/:expenseId").get().patch(updateExpense).delete(deleteExpense);

module.exports = router;
