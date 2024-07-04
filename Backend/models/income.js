const mongoose = require("mongoose");

const incomeSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
  },
  amount: Number,
  category: {
    type: String,
    enum: [
      "Allowance",
      "Salary",
      "Bonus",
      "Freelance",
      "Commission",
      "Sideline",
      "Others",
    ],
    default: "Others",
  },
  // source: String,
  date: Date,
  notes: String,
});

module.exports = mongoose.model("Income", incomeSchema);
