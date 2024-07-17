const express = require("express");
const router = express.Router();

const {
  getAllTransactions,
  getAllUserTransactions,
} = require("../controllers/transactionController");

router.route("/").get(getAllTransactions);

router.route("/user/:userId").get(getAllUserTransactions);

module.exports = router;
