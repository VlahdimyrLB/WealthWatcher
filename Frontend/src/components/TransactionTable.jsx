import React, { useState, useEffect } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Pagination from "./Pagination";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TransactionTable = ({ transactions, loading }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [dataKey, setDataKey] = useState(Date.now()); // Key to force update

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

  // Update the data key to force re-render when transactions change
  useEffect(() => {
    setDataKey(Date.now());
  }, [transactions]);

  const transactionDates = Object.keys(groupedTransactions);

  const getItemSize = (index) => {
    const day = groupedTransactions[transactionDates[index]];

    // Calculate minimum height
    let minHeight = 70;

    // Calculate additional height based on transactions
    if (day.transactions.length > 0) {
      minHeight += day.transactions.length * 32;
    }

    return minHeight;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  const renderRow = ({ index, style }) => {
    const day = groupedTransactions[transactionDates[index]];
    const ddayDate = day.date;
    const dateObj = new Date(ddayDate);

    const dayOfWeek = dateObj.toLocaleString("en-US", { weekday: "short" });

    const formattedDate = `${dayOfWeek.toUpperCase()} ${
      dateObj.getMonth() + 1
    }/${dateObj.getDate()}`;

    return (
      <div
        style={{ ...style, marginBottom: "10px" }}
        className="border-b-2 border-gray-500 "
      >
        <div className="flex flex-row items-center justify-between p-2 py-3 ">
          <div className="font-extrabold text-2xl w-1/4">{formattedDate}</div>
          <div className="w-1/4"></div>
          <div className="flex items-center justify-between space-x-2 w-2/4 text-lg text-end">
            <div className="w-1/2 font-bold text-xl text-blue-700">
              {formatCurrency(day.totalIncome)}
            </div>
            <div className="w-1/2 font-bold text-xl text-red-700">
              {formatCurrency(day.totalExpense)}
            </div>
          </div>
        </div>
        {day.transactions.map((transaction, idx) => (
          <div key={idx} className="flex items-center justify-between p-2">
            <div className="w-1/4 font-bold text-md">
              {/* {transaction.type}: */}
              {transaction.category}
            </div>
            <div className="w-1/4">
              {transaction.notes.length > 20
                ? `${transaction.notes.substr(0, 20)}...`
                : transaction.notes}
            </div>
            <div className="flex w-2/4 items-center justify-between space-x-2 text-end">
              <div className="w-1/2 font-bold text-lg text-blue-700">
                {transaction.type === "Income"
                  ? `${formatCurrency(transaction.amount)}`
                  : null}
              </div>
              <div className="w-1/2 font-bold text-lg text-red-700">
                {transaction.type === "Expense"
                  ? `${formatCurrency(transaction.amount)}`
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
          Total Income:{" "}
          {Object.values(groupedTransactions).reduce(
            (sum, day) => sum + day.totalIncome,
            0
          )}
        </h2>
        <h2>
          Total Expense:{" "}
          {Object.values(groupedTransactions).reduce(
            (sum, day) => sum + day.totalExpense,
            0
          )}
        </h2>
        <h2>
          Net Total:{" "}
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
        className="my-5"
      />

      <div style={{ height: 400, width: "100%" }}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              key={dataKey} // Key to force update
              height={height}
              itemCount={transactionDates.length}
              itemSize={getItemSize}
              width={width}
            >
              {renderRow}
            </List>
          )}
        </AutoSizer>
      </div>
    </section>
  );
};

export default TransactionTable;
