import React, { useState } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";
import { useToast } from "@/components/ui/use-toast";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const CreateTransaction = () => {
  const { toast } = useToast();
  const { user } = useContext(AuthContext);

  const [loadingIncome, setLoadingIncome] = useState(false);
  const [loadingExpense, setLoadingExpense] = useState(false);

  const [errorIncome, setErrorIncome] = useState(null);
  const [errorExpense, setErrorExpense] = useState(null);

  const [incomeFormData, setIncomeFormData] = useState({
    userId: user.id,
    date: new Date(),
    amount: "",
    category: "",
    notes: "",
  });

  const [expenseFormData, setExpenseFormData] = useState({
    userId: user.id,
    date: new Date(),
    amount: "",
    category: "",
    notes: "",
  });

  const clearIncomeForm = () => {
    setIncomeFormData({
      userId: user.id,
      date: new Date(),
      amount: "",
      category: "",
      notes: "",
    });
  };

  const clearExpenseForm = () => {
    setExpenseFormData({
      userId: user.id,
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
          error={errorIncome}
          laoding={loadingIncome}
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
