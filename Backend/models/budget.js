const mongoose = require("mongoose");

const budgetSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
        "Social Life",
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
    startDate: Date,
    period: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"],
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Budget", budgetSchema);
