import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get("/api/v1/transactions");
      console.log(data.transactions);
      setTransactions(data.transactions);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div style={{ color: "white" }}>
      {transactions.map((transaction) => (
        <div key={transaction._id}>
          <div>
            <h3> {transaction.type} </h3>
            <p>
              {transaction.amount} {transaction.category} {transaction.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
