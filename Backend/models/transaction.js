const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["Income", "Expense"],
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
    },
    date: Date,
    notes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
