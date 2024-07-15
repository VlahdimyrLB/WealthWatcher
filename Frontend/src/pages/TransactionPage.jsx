import React from "react";
import TransactionTable from "@/components/TransactionTable";
import CreateTransaction from "@/components/CreateTransaction";

const TransactionPage = () => {
  return (
    <section className="flex">
      <div className="w-3/5 p-4">
        <TransactionTable />
      </div>
      <div className="w-2/5  p-4">
        <CreateTransaction />
      </div>
    </section>
  );
};

export default TransactionPage;
