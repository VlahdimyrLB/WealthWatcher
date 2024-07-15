import React, { useState } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";
import { useToast } from "@/components/ui/use-toast";

const CreateTransaction = () => {
  const { toast } = useToast();

  const [loadingIncome, setLoadingIncome] = useState(false);
  const [loadingExpense, setLoadingExpense] = useState(false);

  const [errorIncome, setErrorIncome] = useState(null);
  const [errorExpense, setErrorExpense] = useState(null);

  const [incomeFormData, setIncomeFormData] = useState({
    date: new Date(),
    amount: "",
    category: "",
    notes: "",
  });

  const [expenseFormData, setExpenseFormData] = useState({
    date: new Date(),
    amount: "",
    category: "",
    notes: "",
  });

  const clearIncomeForm = () => {
    setIncomeFormData({
      date: new Date(),
      amount: "",
      category: "",
      notes: "",
    });
  };

  const clearExpenseForm = () => {
    setExpenseFormData({
      date: new Date(),
      amount: "",
      category: "",
      notes: "",
    });
  };

  const handleIncomeSubmit = async () => {
    setLoadingIncome(true);

    try {
      await axios.post("/api/v1/income", incomeFormData);

      toast({
        title: "Successfully Saved Income",
      });

      console.log(incomeFormData);

      clearIncomeForm();
    } catch (error) {
      setErrorIncome(error.response?.data?.message || "An error occurred");
    } finally {
      setLoadingIncome(false);
    }
  };

  const handleExpenseSubmit = async () => {
    setLoadingExpense(true);

    try {
      await axios.post("/api/v1/expense", expenseFormData);

      toast({
        title: "Successfully Saved Expense",
      });

      console.log(expenseFormData);

      clearExpenseForm();
    } catch (error) {
      setErrorExpense(error.response?.data?.message || "An error occurred");
    } finally {
      setLoadingExpense(false);
    }
  };

  return (
    <Tabs defaultValue="income" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="income">Income</TabsTrigger>
        <TabsTrigger value="expense">Expense</TabsTrigger>
      </TabsList>

      <TabsContent value="income">
        <IncomeForm
          formData={incomeFormData}
          onChange={setIncomeFormData}
          onSubmit={handleIncomeSubmit}
        />
      </TabsContent>

      <TabsContent value="expense">
        <ExpenseForm
          formData={expenseFormData}
          onChange={setExpenseFormData}
          onSubmit={handleExpenseSubmit}
        />
      </TabsContent>
    </Tabs>
  );
};

export default CreateTransaction;
