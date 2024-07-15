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

const ExpenseForm = ({ onSubmit }) => {
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(date, amount, category, notes);
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
            <Popover id="expense-date">
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => handleDateChange(date)}
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
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label>Category</Label>
              <Select
                id="expense-category"
                defaultValue={category}
                onValueChange={(value) => setCategory(value)}
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
              placeholder="Type your message here."
              id="expense-notes"
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Save Expense</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ExpenseForm;
