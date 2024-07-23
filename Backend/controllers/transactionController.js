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

const getTransactionsByDate = async (currentMonth, currentYear) => {
  const startDate = new Date(currentYear, currentMonth, 1);
  const endDate = new Date(currentYear, currentMonth + 1, 1);

  const transactions = await Transaction.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lt: endDate },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        transactions: { $push: "$$ROOT" },
        totalIncome: {
          $sum: {
            $cond: [{ $eq: ["$type", "Income"] }, "$amount", 0],
          },
        },
        totalExpense: {
          $sum: {
            $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        transactions: 1,
        totalIncome: 1,
        totalExpense: 1,
      },
    },
    {
      $sort: { date: 1 },
    },
  ]);

  return transactions;
};

module.exports = {
  getAllTransactions,
  getAllUserTransactions,
  getTransactionsByDate,
};
