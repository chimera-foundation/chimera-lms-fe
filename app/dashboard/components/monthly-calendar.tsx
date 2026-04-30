"use client";
import React, { useState, useMemo, useEffect } from "react";
import { EventItem } from "@/app/models/event";
import { useAppDispatch } from "@/app/redux/hooks";
import { getCalendar } from "@/app/redux/calendar/calendar-slice";
import {
  getCalendarDays,
  getDayName,
  getMonthName,
  groupEventsByDate,
  isCurrentMonth,
  isToday,
} from "@/app/utils/calendar-utils";
import ClickAwayListener from "react-click-away-listener";

interface MonthlyCalendarProps {
  events: EventItem[];
  onEventClick: (events: EventItem[]) => void;
}

export const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({
  events,
  onEventClick,
}) => {
  const dispatch = useAppDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [filters, setFilters] = useState({
    event: false,
    meeting: false,
    schedule: false,
  });
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const filteredEvents = useMemo(() => {
    const hasTypeFilter = filters.event || filters.meeting || filters.schedule;

    if (!hasTypeFilter) {
      return events;
    }

    return events.filter((event) => {
      const eventType = event.EventType?.toLowerCase();

      return (
        (filters.event && eventType === "vanilla") ||
        (filters.meeting && eventType === "meeting") ||
        (filters.schedule && eventType === "schedule")
      );
    });
  }, [events, filters.event, filters.meeting, filters.schedule]);

  const eventsByDate = useMemo(() => {
    return groupEventsByDate(filteredEvents);
  }, [filteredEvents]);

  const getMonthDateRange = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const startDate = new Date(Date.UTC(year, month, 1, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59));

    return {
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    };
  };

  useEffect(() => {
    const { start_date, end_date } = getMonthDateRange(currentDate);
    dispatch(getCalendar({ start_date, end_date }));
  }, [currentDate, dispatch]);

  const calendarDays = useMemo(() => {
    return getCalendarDays(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    if (!selectedDate) return;

    onEventClick(eventsByDate.get(selectedDate) || []);
  }, [selectedDate, eventsByDate, onEventClick]);

  const renderDayEvents = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateKey = `${year}-${month}-${day}`;
    const dayEvents = eventsByDate.get(dateKey) || [];

    return dayEvents.map((event) => (
      <div
        key={event.ID}
        style={{ background: `${event.Color}` }}
        className="text-xs text-white px-2 py-1 rounded mb-1 cursor-pointer hover:bg-gray-600 truncate"
      >
        <div className="font-medium truncate">{event.Title}</div>
        <div className="text-[10px] opacity-80">
          {new Date(event.StartAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
          -
          {new Date(event.EndAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
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

    onEventClick(dayEvents);
  };

  return (
    <div className="bg-chimera-blue-500 rounded-lg shadow">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-white">
            {getMonthName(currentMonth)} {currentYear}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={goToNextMonth}
              className="text-white hover:bg-white/10 rounded-full p-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button
              onClick={goToPreviousMonth}
              className="text-white hover:bg-white/10 rounded-full p-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowFilterPopup((prev) => !prev)}
              className="px-4 py-2 text-sm bg-chimera-blue-700 hover:bg-chimera-blue-600 text-white rounded-lg flex items-center gap-2 transition-colors font-medium border border-white/10"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <ClickAwayListener onClickAway={() => setShowFilterPopup(false)}>
              <div>
                {showFilterPopup && (
                  <div className="absolute right-0 mt-2 w-44 rounded-xl bg-chimera-blue-800 text-white shadow-2xl z-20 p-2 border border-white/5">
                    <div className="space-y-1 text-sm">
                      {[
                        { key: "event", label: "Event" },
                        { key: "meeting", label: "Meeting" },
                        { key: "schedule", label: "Class" },
                      ].map((item) => (
                        <label
                          key={item.key}
                          className="flex items-center justify-between cursor-pointer rounded-lg px-3 py-2 hover:bg-white/5 transition-colors"
                        >
                          <span className="font-medium">{item.label}</span>
                          <input
                            type="checkbox"
                            checked={filters[item.key as keyof typeof filters]}
                            onChange={() => toggleFilter(item.key as keyof typeof filters)}
                            className="h-4 w-4 rounded border-white/20 bg-transparent text-chimera-blue-500 focus:ring-chimera-blue-500"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ClickAwayListener>
          </div>

          <button className="px-4 py-2 text-sm bg-chimera-blue-700 hover:bg-chimera-blue-600 text-white rounded-lg flex items-center gap-2 transition-colors font-medium border border-chimera-blue-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            New Agenda
          </button>
        </div>
      </div>

      <div className="p-4">
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
                className={`${isSelected ? "bg-chimera-blue-100!" : ""
                  } min-h-30 border rounded-lg p-2 cursor-pointer transition-all ${isCurrentMonthDay
                    ? "bg-white border-gray-300 hover:bg-gray-50 hover:shadow-md"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  } ${isTodayDate ? "ring-2 ring-slate-500" : ""}`}
              >
                <div
                  className={`text-sm font-medium mb-1 ${isCurrentMonthDay ? "text-gray-900" : "text-gray-400"
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
