import { useState } from "react";
import Calendar from "react-widgets/Calendar";

export interface CustomCalendarProps {
  date: Date | undefined;
  setDate: any;
}

const CustomCalendar = ({ date, setDate }: CustomCalendarProps) => {
  const handleDate = (date: any) => {
    setDate(date);
  };

  const options = {
    value: date,
    onChange: handleDate,
    min: new Date(Date.now()),
  };

  return (
    <>
      <Calendar
        {...options}
        className="w-full border border-gray-300 rounded-md shadow-md p-2"
      />
    </>
  );
};

export default CustomCalendar;
