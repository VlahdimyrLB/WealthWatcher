// CalendarPage.js
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Calendar from "@/components/Calendar";
import Cookies from "js-cookie";
import axios from "axios";

const CalendarPage = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
              type: transaction.type, // include type for conditional styling
            },
          };
        });

        setEvents(events);
        console.log(events);

        events.forEach((event) => {
          console.log(
            `Event ID: ${event.id}, Type: ${event.extendedProps.type}`
          );
        });
      } catch (error) {
        console.log("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, [user]);

  const handleEventClick = (clickInfo) => {
    console.log(`Event ID: ${clickInfo.event.id}`);
    console.log(`Event Type: ${clickInfo.event.extendedProps.type}`);
    // You can handle the click event further here
  };

  return (
    <div>
      <Calendar myEvents={events} onEventClick={handleEventClick} />
    </div>
  );
};

export default CalendarPage;
