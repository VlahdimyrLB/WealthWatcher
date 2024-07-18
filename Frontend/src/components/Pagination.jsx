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
    <div className="flex justify-between mt-8 mb-4 text-gray-600 dark:text-gray-400  font-bold">
      <button onClick={() => handleMonthChange(-1)}>Previous</button>
      <span className="text-lg ">
        {months[currentMonth]} {currentYear}
      </span>
      <button onClick={() => handleMonthChange(1)}>Next</button>
    </div>
  );
};

export default Pagination;
