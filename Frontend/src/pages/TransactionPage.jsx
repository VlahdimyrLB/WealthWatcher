import React, { useState, useEffect, useContext } from "react";
import TransactionTable from "@/components/TransactionTable";
import CreateTransaction from "@/components/CreateTransaction";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "@/contexts/AuthContext";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const TransactionPage = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    if (!user.id) {
      return console.log("no user");
    }

    try {
      const response = await axios.get(`/api/v1/transaction/user/${user.id}`);
      const sortedTransactions = response?.data?.transactions.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setTransactions(sortedTransactions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user.id]);

  return (
    <section className="flex">
      <div className="w-3/5 p-4">
        <div className="-mt-10 -ml-3">
          <div className="text-[17px] font-semibold opacity-80 mb-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>Menu</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Transaction</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <TransactionTable transactions={transactions} loading={loading} />
      </div>
      <div className="w-2/5 p-4">
        <CreateTransaction fetchTransactions={fetchTransactions} />
      </div>
    </section>
  );
};

export default TransactionPage;
