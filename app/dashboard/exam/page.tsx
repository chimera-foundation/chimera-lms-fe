"use client";
import { WeeklySchedule } from "../components/weekly-schedule";
import { MonthlyCalendar } from "../components/monthly-calendar";
import { EventDetails } from "../components/event-details";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { getCalendar } from "@/app/redux/calendar/calendar-slice";
import { EventItem } from "@/app/models/event";
import { getAllAssessmentsAssignment } from "@/app/redux/assessments/assessment-slice";
import Overview from "./components/overview";
import Assignment from "./components/assignment";
import Exam from "./components/exam";
import OnlineAssignment from "./components/onlineAssignment";
import OnlineExam from "./components/onlineExam";

export default function ExamPage() {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<
    "overview" | "assignment" | "exam" | "onlineAssignment" | "onlineExam"
  >("overview");

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
            Online Assignment
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

      {activeTab === "overview" && <Overview />}
      {activeTab === "assignment" && <Assignment />}
      {activeTab === "exam" && <Exam />}
      {activeTab === "onlineAssignment" && <OnlineAssignment />}
      {activeTab === "onlineExam" && <OnlineExam />}
    </div>
  );
}
