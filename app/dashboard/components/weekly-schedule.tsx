"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { getCalendar } from "@/app/redux/calendar/calendar-slice";
import { EventItem } from "@/app/models/event";
import ChevronDownIcon from "@/app/components/icons/chevron-down-icon";
import ChevronUpIcon from "@/app/components/icons/chevron-up-icon";
import RoomIcon from "@/app/components/icons/room-icon";
import ClockIcon from "@/app/components/icons/clock-icon";

export function WeeklySchedule() {
  const dispatch = useAppDispatch();
  const { calendar, loading } = useAppSelector((x) => x.calendar);
  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    getMonday(new Date()),
  );

  function getMonday(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  const getWeekDates = () => {
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const formatDateRange = () => {
    const weekDates = getWeekDates();
    const start = weekDates[0];
    const end = weekDates[4];

    const startDay = start.getDate();
    const endDay = end.getDate();

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

    if (start.getMonth() === end.getMonth()) {
      return `${months[start.getMonth()]} ${startDay}${getOrdinalSuffix(
        startDay,
      )} - ${endDay}${getOrdinalSuffix(endDay)}`;
    } else {
      return `${months[start.getMonth()]} ${startDay}${getOrdinalSuffix(
        startDay,
      )} - ${months[end.getMonth()]} ${endDay}${getOrdinalSuffix(endDay)}`;
    }
  };

  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const getWeekDateRange = (startDate: Date) => {
    const dates = getWeekDates();
    const start = dates[0];
    const end = dates[4];

    const startUTC = new Date(
      Date.UTC(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0),
    );
    const endUTC = new Date(
      Date.UTC(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59),
    );

    return {
      start_date: startUTC.toISOString(),
      end_date: endUTC.toISOString(),
    };
  };

  useEffect(() => {
    const { start_date, end_date } = getWeekDateRange(currentWeekStart);
    dispatch(getCalendar({ start_date, end_date }));
  }, [currentWeekStart, dispatch]);

  const changeWeek = (increment: number) => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + increment * 7);
    setCurrentWeekStart(newDate);
  };

  const getSchedulesForDate = (date: Date): EventItem[] => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const localDateStr = `${year}-${month}-${day}`;

    return (calendar || []).filter((item) => {
      const itemLocalDate = new Date(item.StartAt);
      const itemYear = itemLocalDate.getFullYear();
      const itemMonth = String(itemLocalDate.getMonth() + 1).padStart(2, "0");
      const itemDay = String(itemLocalDate.getDate()).padStart(2, "0");
      const itemLocalDateStr = `${itemYear}-${itemMonth}-${itemDay}`;

      return itemLocalDateStr === localDateStr;
    });
  };

  const formatTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const weekDates = getWeekDates();

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">{formatDateRange()}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => changeWeek(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Previous week"
          >
            <ChevronUpIcon />
          </button>
          <button
            onClick={() => changeWeek(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Next week"
          >
            <ChevronDownIcon />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {weekDates.map((date, index) => {
          const daySchedules = getSchedulesForDate(date);
          const isToday = formatDate(date) === formatDate(new Date());

          return (
            <div key={index} className="flex flex-col">
              <div
                className={`text-center p-3 rounded-t-lg ${
                  isToday ? "bg-gray-800 text-white" : "bg-gray-600 text-white"
                }`}
              >
                <div className="text-sm font-medium">{weekDays[index]}</div>
                <div className="text-2xl font-bold">{date.getDate()}</div>
              </div>

              <div
                className={`flex-1 rounded-b-lg p-2 space-y-2 min-h-[600px] ${
                  isToday ? "bg-gray-800" : "bg-gray-600"
                }`}
              >
                {loading ? (
                  <div className="text-center text-gray-500 text-sm py-4">
                    Loading...
                  </div>
                ) : daySchedules.length === 0 ? (
                  <div className="text-center text-gray-400 text-sm py-4">
                    No schedules
                  </div>
                ) : (
                  daySchedules.map((item) => (
                    <div
                      key={item.ID}
                      className="bg-[#F5F5F5] rounded-lg p-3 shadow-sm hover:opacity-75 transition-all"
                    >
                      <button className="text-xs font-bold mb-1 bg-white py-1 px-2 rounded-[5px]">
                        {item.EventType}
                      </button>
                      <div className="font-semibold text-sm text-gray-900 mb-2">
                        {item.Title}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                        <ClockIcon />
                        <span>
                          {formatTime(item.StartAt.toString())}-
                          {formatTime(item.EndAt.toString())}
                        </span>
                      </div>
                      {item.Location && (
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <RoomIcon />
                          <span>{item.Location}</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
