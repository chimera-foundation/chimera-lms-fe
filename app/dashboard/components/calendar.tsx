"use client";
import { useState } from "react";
import ChevronDownIcon from "@/app/components/icons/chevron-down-icon";
import ChevronUpIcon from "@/app/components/icons/chevron-up-icon";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const monthNames = [
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

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getDaysInMonth = (date: any) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: any) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const changeMonth = (increment: any) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1)
    );
  };

  const handleDateClick = (day: number) => {
    if (day) {
      const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      setSelectedDate(newDate);
    }
  };

  const days = generateCalendarDays();
  const today = new Date();
  const isCurrentMonth =
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();

  return (
    <div className="bg-white rounded-lg p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg font-bold text-gray-700">Calendar</h2>
          <p className="text-xs text-gray-600">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => changeMonth(-1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronUpIcon />
          </button>
          <button
            onClick={() => changeMonth(1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronDownIcon />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 flex-1">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-[10px] font-medium text-gray-600 flex items-center justify-center"
          >
            {day}
          </div>
        ))}

        {days.map((day, index) => {
          const isToday = isCurrentMonth && day === today.getDate();
          const isSelected =
            day === selectedDate.getDate() &&
            currentDate.getMonth() === selectedDate.getMonth() &&
            currentDate.getFullYear() === selectedDate.getFullYear();
          return (
            <div
              key={index}
              onClick={() => handleDateClick(day as number)}
              className={`
                flex items-center justify-center text-xs rounded transition-all duration-100
                ${day ? "hover:bg-gray-50 cursor-pointer" : ""}
                ${
                  isSelected
                    ? "bg-gray-800 text-white font-semibold hover:bg-gray-700"
                    : ""
                }
                ${
                  !isSelected && isToday
                    ? "bg-gray-300 font-semibold hover:bg-gray-200"
                    : ""
                }
                ${day && !isSelected ? "text-gray-900" : ""}
                ${!day ? "text-gray-300" : ""}
              `}
            >
              {day || ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}
