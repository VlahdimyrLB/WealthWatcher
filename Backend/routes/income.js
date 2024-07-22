const express = require("express");
const router = express.Router();

const {
  getAllIncome,
  getAllUserIncome,
  addIncome,
  updateIncome,
  deleteIncome,
  updateIncomeByTransaction,
  deleteIncomeByTransaction,
} = require("../controllers/incomeController");

router.route("/user/:userId").get(getAllUserIncome);

router.route("/").get(getAllIncome).post(addIncome);

router.route("/:incomeId").patch(updateIncome).delete(deleteIncome);

router
  .route("/:transactionId")
  .patch(updateIncomeByTransaction)
  .delete(deleteIncomeByTransaction);

module.exports = router;
