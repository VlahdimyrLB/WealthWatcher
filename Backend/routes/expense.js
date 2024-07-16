const express = require("express");
const router = express.Router();

const {
  getAllExpense,
  getAllUserExpense,
  addExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

router.route("/").get(getAllExpense).post(addExpense);

router.route("/:expenseId").patch(updateExpense).delete(deleteExpense);

router.route("/user/:userId").get(getAllUserExpense);

module.exports = router;
