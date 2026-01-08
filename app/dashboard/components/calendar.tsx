"use client";
import { useEffect, useState } from "react";
import ChevronDownIcon from "@/app/components/icons/chevron-down-icon";
import ChevronUpIcon from "@/app/components/icons/chevron-up-icon";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import {
  getDashboardDailySchedule,
  getDashboardMonthlyEvents,
} from "@/app/redux/dashboard/dashboard-slice";
import { getAllEvents } from "@/app/redux/event/event-slice";

export function Calendar() {
  const { monthlyEvents } = useAppSelector((x) => x.dashboard);
  const dispatch = useAppDispatch();
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const formatDateToYYYYMMDD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatMonthToYYYYMM = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  const getMonthDateRange = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);

    const lastDay = new Date(year, month + 1, 0);

    return {
      start_date: formatDateToYYYYMMDD(firstDay),
      end_date: formatDateToYYYYMMDD(lastDay),
    };
  };

  useEffect(() => {
    const formattedDate = formatDateToYYYYMMDD(currentDate);
    const formattedMonth = formatMonthToYYYYMM(currentDate);
    const { start_date, end_date } = getMonthDateRange(currentDate);

    dispatch(
      getDashboardDailySchedule({
        date: formattedDate,
      })
    );

    dispatch(
      getDashboardMonthlyEvents({
        date: formattedMonth,
      })
    );

    dispatch(
      getAllEvents({
        start_date,
        end_date,
      })
    );
  }, []);

  useEffect(() => {
    const formattedMonth = formatMonthToYYYYMM(currentDate);
    const { start_date, end_date } = getMonthDateRange(currentDate);
    dispatch(
      getDashboardMonthlyEvents({
        date: formattedMonth,
      })
    );

    dispatch(
      getAllEvents({
        start_date,
        end_date,
      })
    );
  }, [currentDate, dispatch]);

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

      const formattedDate = formatDateToYYYYMMDD(newDate);

      dispatch(
        getDashboardDailySchedule({
          date: formattedDate,
        })
      );
    }
  };

  const hasEvent = (day: number) => {
    const dateString = formatDateToYYYYMMDD(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    );
    return monthlyEvents?.includes(dateString);
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
          const eventMarker = day && hasEvent(day as number);
          return (
            <div
              key={index}
              onClick={() => handleDateClick(day as number)}
              className={`
                flex flex-col items-center justify-center text-xs rounded-[10px] transition-all duration-100`}
            >
              <span
                className={`w-8 h-8 flex items-center justify-center rounded-[10px] font-medium ${
                  day ? "hover:bg-gray-50 cursor-pointer" : ""
                }
                ${
                  isSelected
                    ? "bg-gray-800! text-white font-semibold hover:bg-gray-700"
                    : ""
                }
                ${
                  !isSelected && isToday
                    ? "bg-gray-300 font-semibold hover:bg-gray-200"
                    : ""
                }
                ${day && !isSelected ? "text-gray-900" : ""}
                ${!day ? "text-gray-300" : ""} ${
                  eventMarker ? "bg-zinc-100" : ""
                }`}
              >
                {day || ""}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
