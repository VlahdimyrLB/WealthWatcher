const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
  {
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
        "Food",
        "Bills",
        "Grocery",
        "Social",
        "Pets",
        "Transport",
        "Culture",
        "Household",
        "Apparel",
        "Beauty",
        "Health",
        "Education",
        "Gift",
        "Others",
      ],
      default: "Others",
    },
    date: Date,

    notes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
