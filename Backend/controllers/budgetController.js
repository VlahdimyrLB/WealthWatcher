const Budget = require("../models/budget");

const getAllBudget = async (req, res) => {
  const budget = await Budget.find();

  try {
    if (budget.lenght > 0) {
      return res.status(404).json({ error: "No budget" });
    }

    res.status(201).json({
      budget: budget,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBudgetById = async (req, res) => {
  const { budgetId } = req.params;

  try {
    const budget = await Budget.findById(budgetId);

    if (!budget) {
      return res.status(404).json({ error: "Budget not found" });
    }

    res.status(200).json({ budget });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBudgetsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const budgets = await Budget.find({ userId });

    if (!budgets.length) {
      return res.status(404).json({ error: "No budgets found for this user" });
    }

    res.status(200).json({ budgets });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addBudget = async (req, res) => {
  const { userId, amount, category, startDate, period, notes } = req.body;

  try {
    const savedBudget = await Budget.create({
      userId,
      amount,
      category,
      startDate,
      period,
      notes,
    });

    res.status(201).json({
      message: "Budget created successfully",
      budget: savedBudget,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBudget = async (req, res) => {
  const { budgetId } = req.params;
  const { userId, amount, category, startDate, period, notes } = req.body;

  try {
    const updatedBudget = await Budget.findOneAndUpdate(
      { _id: budgetId },
      {
        userId,
        amount,
        category,
        startDate,
        period,
        notes,
      },
      { new: true, runValdiators: true }
    );

    if (!updatedBudget) {
      return res.status(404).json({ error: "Budget not found" });
    }

    res
      .status(200)
      .json({ budget: updatedBudget, message: "Budget updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBudget = async (req, res) => {
  const { budgetId } = req.params;

  try {
    const deletedBudget = await Budget.findOneAndDelete({ _id: budgetId });

    if (!deletedBudget) {
      return res.status(404).json({ error: "Budget not found" });
    }

    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBudget,
  getBudgetById,
  getBudgetsByUser,
  addBudget,
  updateBudget,
  deleteBudget,
};
