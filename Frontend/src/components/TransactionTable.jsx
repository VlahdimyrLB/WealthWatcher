import React, { useState } from "react";
import { FixedSizeList as List } from "react-window";
import Pagination from "./Pagination";

const TransactionTable = ({ transactions, loading }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const groupTransactionsByDate = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const transactionMonth = date.getMonth();
      const transactionYear = date.getFullYear();

      if (
        transactionMonth === currentMonth &&
        transactionYear === currentYear
      ) {
        const dateString = date.toLocaleDateString();
        if (!acc[dateString]) {
          acc[dateString] = {
            date: dateString,
            transactions: [],
            totalIncome: 0,
            totalExpense: 0,
          };
        }
        acc[dateString].transactions.push(transaction);
        if (transaction.type === "Income") {
          acc[dateString].totalIncome += transaction.amount;
        } else {
          acc[dateString].totalExpense += transaction.amount;
        }
      }

      return acc;
    }, {});
  };

  const groupedTransactions = groupTransactionsByDate(transactions);

  const transactionDates = Object.keys(groupedTransactions);

  const renderRow = ({ index, style }) => {
    const day = groupedTransactions[transactionDates[index]];

    return (
      <div key={index} className="border border-gray-500 mb-3" style={style}>
        <div className="flex items-center justify-between p-2 bg-gray-100">
          <div>{day.date}</div>
          <div className="flex items-center justify-between space-x-2">
            <div className="w-42">Total Income: ${day.totalIncome}</div>
            <div className="w-42">Total Expense: ${day.totalExpense}</div>
          </div>
        </div>
        {day.transactions.map((transaction, idx) => (
          <div key={idx} className="flex items-center justify-between p-2">
            <div>
              {transaction.type}: {transaction.category}
            </div>
            <div className="flex items-center justify-between space-x-2">
              <div className="w-32">
                {transaction.type === "Income"
                  ? `$${transaction.amount}`
                  : null}
              </div>
              <div className="w-32">
                {transaction.type === "Expense"
                  ? `$${transaction.amount}`
                  : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section>
      <div className="mt-10 flex justify-between">
        <h2>
          Total Income:
          {Object.values(groupedTransactions).reduce(
            (sum, day) => sum + day.totalIncome,
            0
          )}
        </h2>
        <h2>
          Total Expense:
          {Object.values(groupedTransactions).reduce(
            (sum, day) => sum + day.totalExpense,
            0
          )}
        </h2>
        <h2>
          Net Total:
          {Object.values(groupedTransactions).reduce(
            (sum, day) => sum + day.totalIncome - day.totalExpense,
            0
          )}
        </h2>
      </div>

      <Pagination
        currentMonth={currentMonth}
        currentYear={currentYear}
        onMonthChange={(month, year) => {
          setCurrentMonth(month);
          setCurrentYear(year);
        }}
      />

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <List
            height={800}
            itemCount={transactionDates.length}
            itemSize={100}
            width={"80%"}
          >
            {renderRow}
          </List>
        )}
      </div>
    </section>
  );
};

export default TransactionTable;
