import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "@/contexts/AuthContext";

const CreateTransaction = ({
  fetchTransactions,
  toUpdateData,
  setToUpdateData,
}) => {
  const { toast } = useToast();
  const { user } = useContext(AuthContext);

  const [loadingIncome, setLoadingIncome] = useState(false);
  const [loadingExpense, setLoadingExpense] = useState(false);

  const [errorIncome, setErrorIncome] = useState(null);
  const [errorExpense, setErrorExpense] = useState(null);

  const [activeTab, setActiveTab] = useState(
    toUpdateData ? toUpdateData.type.toLowerCase() : "income"
  );
  const [isUpdate, setIsUpdate] = useState(false);

  const [incomeFormData, setIncomeFormData] = useState({
    userId: user._id,
    date: new Date(),
    amount: "",
    category: "",
    notes: "",
  });

  const [expenseFormData, setExpenseFormData] = useState({
    userId: user._id,
    date: new Date(),
    amount: "",
    category: "",
    notes: "",
  });

  const clearIncomeForm = () => {
    setIncomeFormData({
      userId: user._id,
      date: new Date(),
      amount: "",
      category: "",
      notes: "",
    });
  };

  const clearExpenseForm = () => {
    setExpenseFormData({
      userId: user._id,
      date: new Date(),
      amount: "",
      category: "",
      notes: "",
    });
  };

  const handleIncomeSubmit = async () => {
    setLoadingIncome(true);

    try {
      if (toUpdateData && toUpdateData.type === "Income") {
        await axios.patch(
          `/api/v1/income/transaction/${toUpdateData._id}`,
          incomeFormData
        );
        toast({ title: "Successfully Updated Income" });
        setErrorIncome(null);
      } else {
        await axios.post("/api/v1/income", incomeFormData);
        toast({ title: "Successfully Saved Income" });
        setErrorIncome(null);
      }

      clearIncomeForm();
      setIsUpdate(false); // Reset the update state
      fetchTransactions();
    } catch (error) {
      setErrorIncome(error.response?.data?.message);
      console.log(error);
    } finally {
      setLoadingIncome(false);
    }
  };

  const handleExpenseSubmit = async () => {
    setLoadingExpense(true);

    try {
      if (toUpdateData && toUpdateData.type === "Expense") {
        await axios.patch(
          `/api/v1/expense/transaction/${toUpdateData._id}`,
          expenseFormData
        );
        toast({ title: "Successfully Updated Expense" });
        setErrorExpense(null);
      } else {
        await axios.post("/api/v1/expense", expenseFormData);
        toast({ title: "Successfully Saved Expense" });
        setErrorExpense(null);
      }

      clearExpenseForm();
      setIsUpdate(false); // Reset the update state
      fetchTransactions();
    } catch (error) {
      setErrorExpense(error.response?.data?.message || "An error occurred");
    } finally {
      setLoadingExpense(false);
    }
  };

  const handleDelete = async () => {
    if (!toUpdateData) {
      toast({ title: "No transaction selected for deletion", status: "error" });
      return;
    }

    try {
      if (toUpdateData.type === "Income") {
        await axios.delete(`/api/v1/income/transaction/${toUpdateData._id}`);
        toast({ title: "Income deleted successfully" });
      } else if (toUpdateData.type === "Expense") {
        await axios.delete(`/api/v1/expense/transaction/${toUpdateData._id}`);
        toast({ title: "Expense deleted successfully" });
      }
      // Fetch transactions after deletion
      fetchTransactions();
      handleBackToAddForm(); // Clear the form and reset state after deletion
    } catch (error) {
      console.error("Delete error: ", error.message);
      toast({
        title: error.response?.data?.message || "Error deleting transaction",
        status: "error",
      });
    }
  };

  useEffect(() => {
    if (toUpdateData) {
      setActiveTab(toUpdateData.type.toLowerCase());
      if (toUpdateData.type === "Income") {
        setIncomeFormData({
          userId: user._id,
          date: new Date(toUpdateData.date),
          amount: toUpdateData.amount,
          category: toUpdateData.category,
          notes: toUpdateData.notes,
        });

        setIsUpdate(true);
      } else {
        setExpenseFormData({
          userId: user._id,
          date: new Date(toUpdateData.date),
          amount: toUpdateData.amount,
          category: toUpdateData.category,
          notes: toUpdateData.notes,
        });

        setIsUpdate(true);
      }
    }
  }, [toUpdateData, user._id]);

  const handleBackToAddForm = () => {
    clearIncomeForm();
    clearExpenseForm();
    setToUpdateData(null);
    setIsUpdate(false);
    setActiveTab("income");
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="income">Income</TabsTrigger>
        <TabsTrigger value="expense">Expense</TabsTrigger>
      </TabsList>

      <TabsContent value="income">
        <IncomeForm
          formData={incomeFormData}
          error={errorIncome}
          setErrorIncome={setErrorIncome}
          loading={loadingIncome}
          onChange={setIncomeFormData}
          onSubmit={handleIncomeSubmit}
          isUpdate={isUpdate}
          handleDelete={handleDelete}
          handleBackToAddForm={handleBackToAddForm}
        />
      </TabsContent>

      <TabsContent value="expense">
        <ExpenseForm
          formData={expenseFormData}
          error={errorExpense}
          setErrorExpense={setErrorExpense}
          loading={loadingExpense}
          onChange={setExpenseFormData}
          onSubmit={handleExpenseSubmit}
          isUpdate={isUpdate}
          handleDelete={handleDelete}
          handleBackToAddForm={handleBackToAddForm}
        />
      </TabsContent>
    </Tabs>
  );
};

export default CreateTransaction;
