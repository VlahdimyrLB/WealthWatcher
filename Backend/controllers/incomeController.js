const Income = require("../models/income");
const Transaction = require("../models/transaction");
const mongoose = require("mongoose");

// add Income and also save the data in Transaction Table
const addIncome = async (req, res) => {
  const { userId, amount, category, date, notes } = req.body;

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

module.exports = { addIncome, updateIncome };
