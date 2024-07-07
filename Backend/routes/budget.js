const express = require("express");
const router = express.Router();

const {
  getAllBudget,
  addBudget,
  updateBudget,
  deleteBudget,
  getBudgetById,
  getBudgetsByUser,
} = require("../controllers/budgetController");

router.route("/").get(getAllBudget).post(addBudget);

router
  .route("/:budgetId")
  .get(getBudgetById)
  .patch(updateBudget)
  .delete(deleteBudget);

router.route("/user/:userId").get(getBudgetsByUser);

module.exports = router;
