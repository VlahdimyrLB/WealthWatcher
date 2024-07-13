const express = require("express");
const app = new express();

const Transaction = require("./models/transaction.js");

require("dotenv").config();

// parse JSON body and urlencode middleware
app.use(express.json());

// ROUTES
const userRoutes = require("./routes/user");
const incomeRoutes = require("./routes/income");
const expenseRoutes = require("./routes/expense");
const budgetRoutes = require("./routes/budget");

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/budget", budgetRoutes);

// view all transaction
app.get("/api/v1/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// db connection and port listener
const connectDB = require("./database/connect.js");
const PORT = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening to port ${PORT}...`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
