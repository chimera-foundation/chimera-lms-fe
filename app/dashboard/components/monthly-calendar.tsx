"use client";
import React, { useState, useMemo } from "react";
import { ScheduleItem } from "@/app/redux/schedule/schedule-slice";
import {
  CalendarEvent,
  getCalendarDays,
  getDayName,
  getMonthName,
  groupEventsByDate,
  isCurrentMonth,
  isToday,
} from "@/app/utils/calendar-utils";

interface MonthlyCalendarProps {
  schedules: ScheduleItem[];
  onEventClick: (event: CalendarEvent) => void;
}

export const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({
  schedules,
  onEventClick,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const eventsByDate = useMemo(() => {
    return groupEventsByDate(schedules);
  }, [schedules]);

  const calendarDays = useMemo(() => {
    return getCalendarDays(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const renderDayEvents = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateKey = `${year}-${month}-${day}`;
    const dayEvents = eventsByDate.get(dateKey) || [];

    return dayEvents.map((event) => (
      <div
        key={event.id}
        className="text-xs bg-gray-700 text-white px-2 py-1 rounded mb-1 cursor-pointer hover:bg-gray-600 truncate"
      >
        <div className="font-medium truncate">{event.title}</div>
        <div className="text-[10px] opacity-80">
          {event.startTime}-{event.endTime}
        </div>
      </div>
    ));
  };

  const handleDateClick = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateKey = `${year}-${month}-${day}`;
    const dayEvents = eventsByDate.get(dateKey) || [];

    setSelectedDate(dateKey);

    if (dayEvents.length > 0) {
      onEventClick(dayEvents[0]);
    } else {
      const noEventPlaceholder: CalendarEvent = {
        id: `no-event-${dateKey}`,
        title: "No events scheduled",
        date: date,
        startTime: "",
        endTime: "",
        type: "event",
        description: `No events scheduled for ${getMonthName(
          date.getMonth()
        )} ${date.getDate()}, ${date.getFullYear()}`,
      };
      onEventClick(noEventPlaceholder);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            {getMonthName(currentMonth)} {currentYear}
          </h2>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-1">
            <button
              onClick={goToPreviousMonth}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={goToNextMonth}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filter
          </button>
          <button className="px-3 py-1.5 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Agenda
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
            <div
              key={dayIndex}
              className="text-center text-sm font-medium text-gray-600 py-2"
            >
              {getDayName(dayIndex)}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((date, index) => {
            const isCurrentMonthDay = isCurrentMonth(date, currentMonth);
            const isTodayDate = isToday(date);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const dateKey = `${year}-${month}-${day}`;
            const isSelected = selectedDate === dateKey;

            return (
              <div
                key={index}
                onClick={() => handleDateClick(date)}
                className={`min-h-[100px] border rounded-lg p-2 cursor-pointer transition-all ${
                  isCurrentMonthDay
                    ? "bg-white border-gray-300 hover:bg-gray-50 hover:shadow-md"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                } ${isTodayDate ? "ring-2 ring-slate-500" : ""} ${
                  isSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""
                }`}
              >
                <div
                  className={`text-sm font-medium mb-1 ${
                    isCurrentMonthDay ? "text-gray-900" : "text-gray-400"
                  } ${isTodayDate ? "text-blue-600 font-bold" : ""}`}
                >
                  {date.getDate()}
                  <span className="text-xs ml-1 font-normal">
                    {getDayName(date.getDay())}
                  </span>
                </div>
                <div className="space-y-1">{renderDayEvents(date)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
