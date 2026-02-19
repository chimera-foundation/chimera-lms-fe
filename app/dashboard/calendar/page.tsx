"use client";
import { WeeklySchedule } from "../components/weekly-schedule";
import { MonthlyCalendar } from "../components/monthly-calendar";
import { EventDetails } from "../components/event-details";
import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { getCalendar } from "@/app/redux/calendar/calendar-slice";
import { EventItem } from "@/app/models/event";

export default function CalendarPage() {
  const { calendar } = useAppSelector((x) => x.calendar);
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<"calendar" | "schedule">(
    "calendar",
  );
  const [selectedEvents, setSelectedEvents] = useState<EventItem[]>([]);

  const agendaCounts = useMemo(() => {
    if (!calendar) return { all: 0, event: 0, meeting: 0 };

    return {
      all: calendar.length,
      event: calendar.filter((e) => e.EventType.toLowerCase() === "vanilla")
        .length,
      meeting: calendar.filter((e) => e.EventType.toLowerCase() === "meeting")
        .length,
    };
  }, [calendar]);

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
    const { start_date, end_date } = getMonthDateRange(new Date());
    dispatch(getCalendar({ start_date, end_date }));
  }, [dispatch]);

  // const agendaCounts = useMemo(() => {
  //   const all = schedule?.filter((s) => s.is_active).length;
  //   const events = schedule.filter(
  //     (s) =>
  //       s.is_active &&
  //       (s.schedule_type.toLowerCase() === "event" ||
  //         s.schedule_type.toLowerCase() === "class")
  //   ).length;
  //   const meetings = schedule.filter(
  //     (s) => s.is_active && s.schedule_type.toLowerCase() === "meeting"
  //   ).length;

  //   return { all, events, meetings };
  // }, [schedule]);

  const handleEventClick = (events: EventItem[]) => {
    setSelectedEvents(events);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Calendar & Schedule
        </h1>

        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "calendar"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Calendar
          </button>
          <button
            onClick={() => setActiveTab("schedule")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "schedule"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Schedule
          </button>
        </div>
      </div>

      {activeTab === "calendar" ? (
        <div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-600 rounded-lg p-4 text-white">
              <div className="text-sm font-medium mb-1">All Agenda</div>
              <div className="text-2xl font-bold">
                {agendaCounts.all}
                <span className="text-base font-normal ml-1">Agenda</span>
              </div>
            </div>
            <div className="bg-gray-600 rounded-lg p-4 text-white">
              <div className="text-sm font-medium mb-1">Event Agenda</div>
              <div className="text-2xl font-bold mr">
                {agendaCounts.event}
                <span className="text-base font-normal ml-1">Agenda</span>
              </div>
            </div>
            <div className="bg-gray-600 rounded-lg p-4 text-white">
              <div className="text-sm font-medium mb-1">Meeting Agenda</div>
              <div className="text-2xl font-bold">
                {agendaCounts.meeting}
                <span className="text-base font-normal ml-1">Agenda</span>
              </div>
            </div>
          </div>

          <div
            className={`grid grid-cols-1 gap-6 ${
              selectedEvents.length > 0 ? "lg:grid-cols-3" : ""
            }`}
          >
            <div className={selectedEvents.length > 0 ? "lg:col-span-2" : ""}>
              <MonthlyCalendar
                events={calendar}
                onEventClick={handleEventClick}
              />
            </div>
            {selectedEvents.length > 0 && (
              <div>
                <EventDetails events={selectedEvents} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <WeeklySchedule />
      )}
    </div>
  );
}
