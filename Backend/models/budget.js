const mongoose = require("mongoose");

const budgetSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "IncomeCategory",
  },
  startDate: Date,
  period: String, // "monhtly" or "annual" chucu
  notes: String,
});

module.exports = mongoose.model("Budget", budgetSchema);
