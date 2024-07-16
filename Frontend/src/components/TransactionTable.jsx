import React from "react";

import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const TransactionTable = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(false);
  const [laoding, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user.id) {
        return console.log("no user");
      }

      try {
        const response = await axios.get(`/api/v1/transaction/user/${user.id}`);

        setTransactions(response?.data?.transactions);

        // is it normal that this is logged twice?
        console.log(response?.data?.transactions);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      {/* {transactions.map((transaction) => (
        <div key={transaction._id}>
          <p>{transaction.amount}</p>
        </div>
      ))} */}
    </div>
  );
};

export default TransactionTable;
