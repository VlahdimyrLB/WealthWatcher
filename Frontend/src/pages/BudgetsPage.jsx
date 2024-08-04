import React, { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import { AuthContext } from "@/contexts/AuthContext";
import FullCalendar from "../components/Calendar";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

import { useToast } from "@/components/ui/use-toast";
import { Spinner2 } from "@/components/Spinners";

const BudgetsPage = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useToast();

  // forda transition
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, [user?._id]);

  return (
    <section className="flex flex-col pb-10 lg:flex-row">
      <div
        className={`lg:w-2/5 p-4 transition-transform  duration-1000 ease-out ${
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
                  <BreadcrumbPage>Budget</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Form */}
        <form action="">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-400">Budget</CardTitle>
              <CardDescription>Click save when you're done.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 justify-between items-center">
                <div>
                  <Label>Amount</Label>
                  <Input></Input>
                </div>

                <div>
                  <Label>Period</Label>
                  <Select
                    id="period"
                    // value={formData.category}
                    // onValueChange={handleCategoryChange}
                    required
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                      <SelectItem value="Yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>

      <div
        className={`lg:w-3/5 p-4 flex justify-left transition-transform duration-1000 ease-out ${
          fadeIn
            ? "transform translate-x-0 opacity-100"
            : "transform translate-x-10 opacity-0"
        }`}
      >
        Computation
      </div>
    </section>
  );
};

export default BudgetsPage;
