import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

import { Spinner2 } from "./Spinners";

const ExpenseForm = ({
  formData,
  onChange,
  onSubmit,
  error,
  loading,
  isUpdate,
  handleDelete,
  handleBackToAddForm,
}) => {
  const handleDateChange = (selectedDate) => {
    onChange({ ...formData, date: selectedDate });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  const handleCategoryChange = (value) => {
    onChange({ ...formData, category: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const confirmDelete = () => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      handleDelete();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle className="text-red-700">Expense</CardTitle>
          <CardDescription>Click save when you're done.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-col space-y-1">
            <Label>Date</Label>
            <Popover id="income-date">
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !formData.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? (
                    format(formData.date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-1">
              <Label htmlFor="expense-amount">Amount</Label>
              <Input
                id="expense-amount"
                name="amount"
                type="number"
                placeholder="10,000"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-1">
              <Label>Category</Label>
              <Select
                id="expense-category"
                value={formData.category}
                onValueChange={handleCategoryChange}
                required
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Bills">Bills</SelectItem>
                  <SelectItem value="Social">Social Life</SelectItem>
                  <SelectItem value="Pets">Pets</SelectItem>
                  <SelectItem value="Transport">Transport</SelectItem>
                  <SelectItem value="Culture">Culture</SelectItem>
                  <SelectItem value="Household">Household</SelectItem>
                  <SelectItem value="Apparel">Apparel</SelectItem>
                  <SelectItem value="Beauty">Beauty</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Gift">Gift</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid w-full gap-1.5 mt-1">
            <Label htmlFor="expense-notes">Note</Label>
            <Textarea
              placeholder="Type a note here."
              id="expense-notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
            />
          </div>

          <p className="text-red-600 text-sm text-center">
            {error ? error : null}
          </p>
        </CardContent>
        <CardFooter>
          {loading ? (
            <div>
              <Spinner2 size={10} />
            </div>
          ) : (
            <>
              {!isUpdate ? (
                <Button type="submit">Save Income</Button>
              ) : (
                <div>
                  <Button type="submit">Update Income</Button>
                  <Button
                    variant="destructive"
                    type="button"
                    className="mx-3"
                    onClick={confirmDelete}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="ghost"
                    type="button"
                    className="ml-4"
                    onClick={handleBackToAddForm}
                  >
                    Back to Add
                  </Button>
                </div>
              )}
            </>
          )}
        </CardFooter>
      </Card>
    </form>
  );
};

export default ExpenseForm;
