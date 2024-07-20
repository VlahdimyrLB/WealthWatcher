import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";

const Calendar = () => {
  return (
    <div className="mb-10">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, multiMonthPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: "Event #1", start: "2024-07-19" },
          { title: "Event #2", start: "2024-07-21" },
        ]}
        headerToolbar={{
          left: "today prev,next",
          right: "dayGridMonth,timeGridWeek,listDay,multiMonthYear",
          center: "title",
        }}
      />
    </div>
  );
};

export default Calendar;
