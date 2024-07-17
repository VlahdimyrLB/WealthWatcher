import React from "react";

const Pagination = ({ currentMonth, currentYear, onMonthChange }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthChange = (direction) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    onMonthChange(newMonth, newYear);
  };

  return (
    <div className="flex justify-between mb-4">
      <button onClick={() => handleMonthChange(-1)}>Previous</button>
      <span>
        {months[currentMonth]} {currentYear}
      </span>
      <button onClick={() => handleMonthChange(1)}>Next</button>
    </div>
  );
};

export default Pagination;
