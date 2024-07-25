const Income = require("../models/income");
const Transaction = require("../models/transaction");
const mongoose = require("mongoose");

const getAllIncome = async (req, res) => {
  try {
    const income = await Income.find({});
    res.status(200).json({ income });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUserIncome = async (req, res) => {
  const { userId } = req.params;
  try {
    const income = await Income.find({ userId: userId });
    res.status(200).json({ income });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// add Income and also save the data in Transaction Table
const addIncome = async (req, res) => {
  const { userId, amount, category, date, notes } = req.body;

  if (!amount || !category || !date) {
    return res.status(400).json({ message: "Please input required fields" });
  }

  // session for transaction handling
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newIncome = new Income({
      userId,
      amount,
      category,
      date,
      notes,
    });

    const savedIncome = await newIncome.save({ session });

    const newTransaction = new Transaction({
      userId,
      type: "Income",
      amount,
      category,
      date,
      notes,
    });

    const savedTransaction = await newTransaction.save({ session });

    // set income.transactionId to the id of transaction id
    savedIncome.transactionId = savedTransaction._id;
    await savedIncome.save({ session });

    // commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Saved Successfully",
      income: savedIncome,
      transaction: savedTransaction,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ error: "Failed to save income and transaction" });
  }
};

// update Income and update also in transaction
const updateIncome = async (req, res) => {
  const { incomeId } = req.params;
  const { amount, category, date, notes } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // save update to income collection
    const updatedIncome = await Income.findOneAndUpdate(
      { _id: incomeId },
      { amount, category, date, notes },
      {
        new: true,
        session,
        runValidators: true,
      }
    );

    if (!updatedIncome) {
      throw new Error("Income entry not found");
    }

    // save update to transaction collection
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: updatedIncome.transactionId },
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
      income: updatedIncome,
      transaction: updatedTransaction,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ error: "Failed to update income and transaction" });
  }
};

// delete both data from income and transaction
const deleteIncome = async (req, res) => {
  const { incomeId } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const incomeEntry = await Income.findById(incomeId).session(session);

    console.log(incomeEntry);
    if (!incomeEntry) {
      throw new Error("Income entry not found");
    }

    await Income.findByIdAndDelete(incomeId, { session });

    await Transaction.findByIdAndDelete(incomeEntry.transactionId, { session });

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
const updateIncomeByTransaction = async (req, res) => {
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

    // If the transaction type is Income, update the corresponding Income entry
    if (updatedTransaction.type === "Income") {
      const updatedIncome = await Income.findOneAndUpdate(
        { transactionId: updatedTransaction._id },
        { amount, category, date, notes },
        {
          new: true,
          session,
          runValidators: true,
        }
      );

      if (!updatedIncome) {
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
const deleteIncomeByTransaction = async (req, res) => {
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

    if (transactionEntry.type === "Income") {
      await Income.findByIdAndDelete(transactionEntry._id, { session });
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
  getAllIncome,
  getAllUserIncome,
  addIncome,
  updateIncome,
  deleteIncome,
  updateIncomeByTransaction,
  deleteIncomeByTransaction,
};
