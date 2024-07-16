const Transaction = require("../models/transaction.js");

// view all transaction
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUserTransactions = async (req, res) => {
  const { userId } = req.params;
  try {
    const transactions = await Transaction.find({ userId });
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllTransactions, getAllUserTransactions };
