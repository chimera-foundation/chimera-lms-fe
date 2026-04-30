"use client";
import { WeeklySchedule } from "../components/weekly-schedule";
import { MonthlyCalendar } from "../components/monthly-calendar";
import { EventDetails } from "../components/event-details";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { getCalendar } from "@/app/redux/calendar/calendar-slice";
import { EventItem } from "@/app/models/event";
import { getAllAssessmentsAssignment, getAllAssessmentsExam } from "@/app/redux/assessments/assessment-slice";
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

  const [dateFilter, setDateFilter] = useState<"this_week" | "this_month" | "this_year">("this_month");
  const { assessmentAssignment, assessmentExam, loading } = useAppSelector((x) => x.assessment);

  const getDateRange = (filter: "this_week" | "this_month" | "this_year") => {
    const now = new Date();
    let start = new Date();
    let end = new Date();

    if (filter === "this_week") {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      start = new Date(now.setDate(diff));
      start.setHours(0, 0, 0, 0);
      end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
    } else if (filter === "this_month") {
      start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    } else if (filter === "this_year") {
      start = new Date(now.getFullYear(), 0, 1, 0, 0, 0);
      end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
    }

    return {
      start_date: start.toISOString(),
      end_date: end.toISOString(),
    };
  };

  useEffect(() => {
    const { start_date, end_date } = getDateRange(dateFilter);
    dispatch(
      getAllAssessmentsAssignment({
        start_date,
        end_date,
        type: "assignment",
      }),
    );
    dispatch(
      getAllAssessmentsExam({
        start_date,
        end_date,
        type: "exam",
      }),
    );
  }, [dispatch, dateFilter]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Assignment & Exam
        </h1>

        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === "overview"
              ? "text-chimera-blue-400 border-b-2 border-chimera-blue-400"
              : "text-gray-500 hover:text-chimera-blue-500"
              }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("assignment")}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === "assignment"
              ? "text-chimera-blue-400 border-b-2 border-chimera-blue-400"
              : "text-gray-500 hover:text-chimera-blue-500"
              }`}
          >
            Assignment
          </button>
          <button
            onClick={() => setActiveTab("exam")}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === "exam"
              ? "text-chimera-blue-400 border-b-2 border-chimera-blue-400"
              : "text-gray-500 hover:text-chimera-blue-500"
              }`}
          >
            Exam
          </button>
          <button
            onClick={() => setActiveTab("onlineAssignment")}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === "onlineAssignment"
              ? "text-chimera-blue-400 border-b-2 border-chimera-blue-400"
              : "text-gray-500 hover:text-chimera-blue-500"
              }`}
          >
            Online Assignment
          </button>
          <button
            onClick={() => setActiveTab("onlineExam")}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === "onlineExam"
              ? "text-chimera-blue-400 border-b-2 border-chimera-blue-400"
              : "text-gray-500 hover:text-chimera-blue-500"
              }`}
          >
            Online Exam
          </button>
        </div>
      </div>

      {activeTab === "overview" && (
        <Overview
          assessmentAssignment={assessmentAssignment}
          assessmentExam={assessmentExam}
          loading={loading}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
      )}
      {activeTab === "assignment" && (
        <Assignment
          assessmentAssignment={assessmentAssignment}
          loading={loading}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
      )}
      {activeTab === "exam" && (
        <Exam
          assessmentExam={assessmentExam}
          loading={loading}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
      )}
      {activeTab === "onlineAssignment" && <OnlineAssignment />}
      {activeTab === "onlineExam" && <OnlineExam />}
    </div>
  );
}
