const express = require("express");
const router = express.Router();

const {
  getAllTransactions,
  getAllUserTransactions,
} = require("../controllers/transactionController");

const { protect } = require("../middleware/authMiddleware");

// Protected routes
router.route("/").get(protect, getAllTransactions);
router.route("/user/:userId").get(protect, getAllUserTransactions);

module.exports = router;
