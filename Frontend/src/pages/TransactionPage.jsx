import React, { useState, useEffect, useContext } from "react";
import TransactionTable from "@/components/TransactionTable";
import CreateTransaction from "@/components/CreateTransaction";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const TransactionPage = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  //for data update to be passed in create transaction and
  const [toUpdateData, setToUpdateData] = useState(null);

  // Function to fetch transactions
  const fetchTransactions = async () => {
    if (!user?._id) {
      return console.log("No user ID available");
    }

    try {
      const token = Cookies.get("token");
      const response = await axios.get(`/api/v1/transaction/user/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const sortedTransactions = response?.data?.transactions.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setTransactions(sortedTransactions);
    } catch (error) {
      console.log("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    setFadeIn(true);
  }, [user?._id]);

  console.log(toUpdateData);

  return (
    <section className="flex flex-col-reverse pb-10 lg:flex-row">
      <div
        className={`lg:w-3/5 p-4 transition-transform  duration-1000 ease-out ${
          fadeIn
            ? "transform translate-y-0 opacity-100"
            : "transform translate-y-10 opacity-0"
        }`}
      >
        <div className="lg:-mt-10 -ml-3">
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

        <TransactionTable
          transactions={transactions}
          toUpdateData={toUpdateData}
          setToUpdateData={setToUpdateData}
          loading={loading}
        />
      </div>

      <div
        className={`lg:w-2/5 p-4 flex justify-center transition-transform duration-1000 ease-out ${
          fadeIn
            ? "transform translate-x-0 opacity-100"
            : "transform translate-x-10 opacity-0"
        }`}
      >
        <CreateTransaction
          fetchTransactions={fetchTransactions}
          toUpdateData={toUpdateData}
        />
      </div>
    </section>
  );
};

export default TransactionPage;
