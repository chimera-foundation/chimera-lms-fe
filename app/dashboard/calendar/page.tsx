"use client";
import { WeeklySchedule } from "../components/weekly-schedule";
import { MonthlyCalendar } from "../components/monthly-calendar";
import { EventDetails } from "../components/event-details";
import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { getAllSchedules } from "@/app/redux/schedule/schedule-slice";
import { CalendarEvent } from "@/app/utils/calendar-utils";

export default function CalendarPage() {
  const { schedule } = useAppSelector((x) => x.schedule);
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<"calendar" | "schedule">(
    "calendar"
  );
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  useEffect(() => {
    dispatch(getAllSchedules({ itemize: true }));
  }, []);

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

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
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
                {/* {agendaCounts.all}{" "} */}
                TODO FROM BE
                <span className="text-base font-normal">Agenda</span>
              </div>
            </div>
            <div className="bg-gray-600 rounded-lg p-4 text-white">
              <div className="text-sm font-medium mb-1">Event Agenda</div>
              <div className="text-2xl font-bold">
                {/* {agendaCounts.events}{" "} */}
                TODO FROM BE
                <span className="text-base font-normal">Agenda</span>
              </div>
            </div>
            <div className="bg-gray-600 rounded-lg p-4 text-white">
              <div className="text-sm font-medium mb-1">Meeting Agenda</div>
              <div className="text-2xl font-bold">
                {/* {agendaCounts.meetings}{" "} */}
                TODO FROM BE
                <span className="text-base font-normal">Agenda</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MonthlyCalendar
                schedules={schedule}
                onEventClick={handleEventClick}
              />
            </div>
            <div>
              <EventDetails event={selectedEvent} />
            </div>
          </div>
        </div>
      ) : (
        <WeeklySchedule />
      )}
    </div>
  );
}
