"use client";
import { WeeklySchedule } from "../components/weekly-schedule";
import { Calendar } from "../components/calendar";
import { useState } from "react";

export default function CalendarPage() {
  const [activeTab, setActiveTab] = useState<"calendar" | "schedule">(
    "schedule"
  );

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
        <div className="max-w-md">{/* <Calendar /> */}</div>
      ) : (
        <WeeklySchedule />
      )}
    </div>
  );
}
