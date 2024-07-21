import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";

const Calendar = ({ myEvents, onEventClick }) => {
  const renderEventContent = (eventInfo) => {
    const { category, amount } = eventInfo.event.extendedProps;
    return (
      <div className="fc-event-title">
        {/* ${category} */}
        <span className="text-sm">{`₱${parseFloat(amount).toLocaleString(
          "en-US",
          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
        )}`}</span>
      </div>
    );
  };

  const eventClassNames = (eventInfo) => {
    return eventInfo.event.extendedProps.type === "Income"
      ? "text-blue-600"
      : "text-red-600";
  };

  return (
    <div className="mb-10">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, multiMonthPlugin]}
        initialView="dayGridMonth"
        events={myEvents}
        headerToolbar={{
          left: "today prev,next",
          right: "dayGridMonth,timeGridWeek,listDay,multiMonthYear",
          center: "title",
        }}
        eventContent={renderEventContent} // custom render function
        eventClick={onEventClick} // handle event clicks
        eventClassNames={eventClassNames} // custom class names based on type
      />
    </div>
  );
};

export default Calendar;
