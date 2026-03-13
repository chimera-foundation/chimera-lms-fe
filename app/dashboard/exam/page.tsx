"use client";
import { WeeklySchedule } from "../components/weekly-schedule";
import { MonthlyCalendar } from "../components/monthly-calendar";
import { EventDetails } from "../components/event-details";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { getCalendar } from "@/app/redux/calendar/calendar-slice";
import { EventItem } from "@/app/models/event";
import { getAllAssessmentsAssignment } from "@/app/redux/assessments/assessment-slice";

export default function ExamPage() {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<
    "overview" | "assignment" | "exam" | "onlineAssignment" | "onlineExam"
  >("overview");
  const [selectedEvents, setSelectedEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    dispatch(getAllAssessmentsAssignment({}));
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Assignment & Exam
        </h1>

        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "overview"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("assignment")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "assignment"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Assignment
          </button>
          <button
            onClick={() => setActiveTab("exam")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "exam"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Exam
          </button>
          <button
            onClick={() => setActiveTab("onlineAssignment")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "onlineAssignment"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("onlineExam")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "onlineExam"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Online Exam
          </button>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-600 rounded-lg p-4 text-white">
            <div className="text-sm font-medium mb-1">Upcoming Assignment</div>
            <div className="text-2xl font-bold">
              TODO<span className="text-base font-normal ml-1">Assignment</span>
            </div>
          </div>
          <div className="bg-gray-600 rounded-lg p-4 text-white">
            <div className="text-sm font-medium mb-1">Upcoming Exam</div>
            <div className="text-2xl font-bold mr">
              TODO<span className="text-base font-normal ml-1">Exam</span>
            </div>
          </div>
          <div className="bg-gray-600 rounded-lg p-4 text-white">
            <div className="text-sm font-medium mb-1">Missed Assignment</div>
            <div className="text-2xl font-bold">
              TODO<span className="text-base font-normal ml-1">Assignment</span>
            </div>
          </div>
          <div className="bg-gray-600 rounded-lg p-4 text-white">
            <div className="text-sm font-medium mb-1">Missed Exam</div>
            <div className="text-2xl font-bold">
              TODO<span className="text-base font-normal ml-1">Exam</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
