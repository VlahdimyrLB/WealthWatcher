const Expense = require("../models/expense");
const Transaction = require("../models/transaction");
const mongoose = require("mongoose");

const getAllExpense = async (req, res) => {
  try {
    const expense = await Expense.find({});
    res.status(200).json({ expense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUserExpense = async (req, res) => {
  const { userId } = req.params;
  try {
    const expense = await Expense.find({ userId: userId });
    res.status(200).json({ expense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addExpense = async (req, res) => {
  const { userId, amount, category, date, notes } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newExpense = new Expense({
      userId,
      amount,
      category,
      date,
      notes,
    });

    const savedExpense = await newExpense.save({ session });

    const newTransaction = new Transaction({
      userId,
      type: "Expense",
      amount,
      category,
      date,
      notes,
    });

    const savedTransaction = await newTransaction.save({ session });

    savedExpense.transactionId = savedTransaction._id;
    await savedExpense.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Saved Successfully",
      income: savedExpense,
      transaction: savedTransaction,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ error: "Failed to save expense and transaction" });
  }
};

const updateExpense = async (req, res) => {
  const { expenseId } = req.params;
  const { amount, category, date, notes } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: expenseId },
      { amount, category, date, notes },
      {
        new: true,
        session,
        runValidators: true,
      }
    );

    if (!updatedExpense) {
      throw new Error("Income entry not found");
    }

    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: updatedExpense.transactionId },
      { amount, category, date, notes },
      {
        new: true,
        session,
        runValidators: true,
      }
    );

    if (!updatedTransaction) {
      throw new Error("Transaction entry not found");
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Updated Successfully",
      income: updatedExpense,
      transaction: updatedTransaction,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ error: "Failed to update expense and transaction" });
  }
};

const deleteExpense = async (req, res) => {
  const { expenseId } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const expenseEntry = await Expense.findById(expenseId).session(session);

    console.log(expenseEntry);
    if (!expenseEntry) {
      throw new Error("Expense entry not found");
    }

    await Expense.findByIdAndDelete(expenseEntry, { session });

    await Transaction.findByIdAndDelete(expenseEntry.transactionId, {
      session,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update transaction
const updateExpenseByTransaction = async (req, res) => {
  const { transactionId } = req.params;
  const { amount, category, date, notes } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Update transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { amount, category, date, notes },
      {
        new: true,
        session,
        runValidators: true,
      }
    );

    if (!updatedTransaction) {
      throw new Error("Transaction entry not found");
    }

    // If the transaction type is Expense, update the corresponding expense entry
    if (updatedTransaction.type === "Expense") {
      const updatedExpense = await Expense.findOneAndUpdate(
        { transactionId: updatedTransaction._id },
        { amount, category, date, notes },
        {
          new: true,
          session,
          runValidators: true,
        }
      );

      if (!updatedExpense) {
        throw new Error("Income entry not found");
      }
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Transaction updated successfully",
      transaction: updatedTransaction,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

// Delete transaction
const deleteExpenseByTransaction = async (req, res) => {
  const { transactionId } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const transactionEntry = await Transaction.findById(transactionId).session(
      session
    );

    if (!transactionEntry) {
      throw new Error("Transaction entry not found");
    }

    await Transaction.findByIdAndDelete(transactionId, { session });

    if (transactionEntry.type === "Expense") {
      await Expense.findByIdAndDelete(transactionEntry._id, { session });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllExpense,
  getAllUserExpense,
  addExpense,
  updateExpense,
  deleteExpense,
  updateExpenseByTransaction,
  deleteExpenseByTransaction,
};
