// CalendarPage.js
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import FullCalendar from "../components/Calendar";
import Cookies from "js-cookie";
import axios from "axios";
import TransactionDialog from "@/components/TransactionDialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Spinner2 } from "@/components/Spinners";
import { Skeleton } from "@/components/ui/skeleton";
import { date } from "zod";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CalendarPage = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const [toUpdateData, setToUpdateData] = useState({
    _id: "",
    transactionId: "",
    type: "",
    amount: "",
    date: "",
    notes: "",
    category: "",
  });

  const [categoryOptions, setCategoryOptions] = useState([]);

  const [transactType, setTransactType] = useState();

  useEffect(() => {
    if (!user) {
      return console.log("No user ID available");
    }

    const fetchIncome = async () => {
      try {
        const response = await axios.get(`/api/v1/income/user/${user._id}`);

        console.log("user income: ", response.data.income);

        setIncomeData(response.data.income);
      } catch (error) {
        console.log("Error fetching income:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncome();
  }, []);
  // console.log(incomeData);

  useEffect(() => {
    if (!user) {
      return console.log("No user ID available");
    }

    const fetchExpense = async () => {
      try {
        const response = await axios.get(`/api/v1/expense/user/${user._id}`);

        console.log("user expense: ", response.data.expense);

        setExpenseData(response.data.expense);
      } catch (error) {
        console.log("Error fetching expense:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpense();
  }, []);
  // console.log(expenseData);

  useEffect(() => {
    if (!user) {
      return console.log("No user ID available");
    }

    const fetchTransactionData = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `/api/v1/transaction/user/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const sortedTransactions = response?.data?.transactions.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        const events = sortedTransactions.map((transaction) => {
          return {
            id: transaction._id,
            title: transaction.category,
            start: transaction.date,
            extendedProps: {
              category: transaction.category,
              amount: transaction.amount,
              type: transaction.type,
            },
          };
        });

        setEvents(events);

        // console.log(events);
        // events.forEach((event) => {
        //   console.log(
        //     `Event ID: ${event.id}, Type: ${event.extendedProps.type}`
        //   );
        // });
      } catch (error) {
        console.log("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, [events]);

  const handleEventClick = (clickInfo) => {
    // console.log(`Event ID: ${clickInfo.event.id}`);
    // console.log(`Event Type: ${clickInfo.event.extendedProps.type}`);

    const transactionId = clickInfo.event.id;
    const transactionType = clickInfo.event.extendedProps.type;

    const transactionData =
      transactionType === "Income"
        ? incomeData.find((income) => income.transactionId === transactionId)
        : expenseData.find(
            (expense) => expense.transactionId === transactionId
          );

    // console.log(transactionData.type);

    setToUpdateData({
      _id: transactionData._id,
      transactionId: transactionData.transactionId,
      type: transactionData.type,
      amount: transactionData.amount,
      date: new Date(transactionData.date),
      notes: transactionData.notes,
      category: transactionData.category,
    });

    setTransactType(transactionType);

    // Set category options based on transaction type
    const categories =
      transactionType === "Income"
        ? [
            "Allowance",
            "Salary",
            "Bonus",
            "Freelance",
            "Commission",
            "Sideline",
            "Others",
          ]
        : [
            "Food",
            "Bills",
            "Grocery",
            "Social",
            "Pets",
            "Transport",
            "Culture",
            "Household",
            "Apparel",
            "Beauty",
            "Health",
            "Education",
            "Gift",
            "Others",
          ];

    setCategoryOptions(categories);

    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setToUpdateData({ ...toUpdateData, [name]: value });
  };

  const handleDateChange = (selectedDate) => {
    setToUpdateData({ ...toUpdateData, date: selectedDate });
  };

  const handleCategoryChange = (value) => {
    setToUpdateData({ ...toUpdateData, category: value });
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(
        `/api/v1/income/transaction/${toUpdateData.transactionId}`
      );

      toast({
        title: "Deleted Successfully",
      });
    } catch (error) {
      console.log(error.message);
    }

    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      transactType === "Income"
        ? await axios.patch(`/api/v1/income/${toUpdateData._id}`, toUpdateData)
        : await axios.patch(
            `/api/v1/expense/${toUpdateData._id}`,
            toUpdateData
          );

      toast({
        title: "Successfully Updated",
      });
    } catch (error) {
      // setErrorIncome(error.response?.data?.message || "An error occurred");
      console.log(error.message);
    }

    setIsOpen(false);
  };

  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true);
  }, [user?._id]);

  return (
    <div
      className={`p-4 transition-transform  duration-1000 ease-out ${
        fadeIn
          ? "transform translate-y-0 opacity-100"
          : "transform translate-y-10 opacity-0"
      }`}
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm">Binding Calendar Data ...</p>
          <Spinner2 size={15} />
        </div>
      ) : (
        <FullCalendar myEvents={events} onEventClick={handleEventClick} />
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit transaction</DialogTitle>
            <DialogDescription>
              Make changes to your transactions here. Please check the
              <b>
                <i> transaction type </i>
              </b>
              properly.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col opacity-60 text-sm">
                <div>
                  <b>IncomeId: </b>
                  {toUpdateData._id}
                </div>
                <div>
                  <b>TransId: </b>
                  {toUpdateData.transactionId}
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <Label htmlFor="transaction-date">Date</Label>
                <Popover id="transaction-date">
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal",
                        !toUpdateData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {toUpdateData.date ? (
                        format(toUpdateData.date, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={toUpdateData.date}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-1">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    name="amount"
                    className="col-span-3"
                    value={toUpdateData.amount || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-1">
                  <Label>Category</Label>
                  <Select
                    id="category"
                    value={toUpdateData.category}
                    onValueChange={handleCategoryChange}
                    required
                  >
                    <SelectTrigger className="col-span-3 w-[180px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((categories) => (
                        <SelectItem key={categories} value={categories}>
                          {categories}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid w-full gap-1.5 mt-1">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  className="col-span-3"
                  value={toUpdateData.notes || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter className="flex items-center justify-between">
              <Button type="submit">Save changes</Button>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Close
              </Button>
              <Button onClick={handleDelete}>Delete</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarPage;
