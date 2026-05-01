"use client";
import {
  getCourses,
  getSubject,
  getTrend,
  getCharacterPoints,
} from "@/app/redux/grade/grade-slice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import OverviewTab from "./components/overview-tab";
import GradeTab from "./components/grade-tab";
import CharacterTab from "./components/character-tab";
import { useEffect, useState } from "react";

export default function GradePage() {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<
    "overview" | "grade" | "character" | "achievement" | "reportCard"
  >("overview");
  const [characterFilter, setCharacterFilter] = useState("this_week");
  const { trend, courses, subjects, characterPoints, loading } = useAppSelector((x) => x.grade);

  useEffect(() => {
    dispatch(getTrend({ filter: "this_year" }));
    dispatch(getCourses());
    dispatch(getSubject({ filter: "2026" }));
  }, [dispatch]);

  useEffect(() => {
    if (activeTab === "character") {
      dispatch(getCharacterPoints({ filter: characterFilter, limit: 100, offset: 0 }));
    }
  }, [dispatch, activeTab, characterFilter]);


  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Grade</h1>

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
            onClick={() => setActiveTab("grade")}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === "grade"
              ? "text-chimera-blue-400 border-b-2 border-chimera-blue-400"
              : "text-gray-500 hover:text-chimera-blue-500"
              }`}
          >
            Grade
          </button>
          <button
            onClick={() => setActiveTab("character")}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === "character"
              ? "text-chimera-blue-400 border-b-2 border-chimera-blue-400"
              : "text-gray-500 hover:text-chimera-blue-500"
              }`}
          >
            Character
          </button>
          <button
            onClick={() => setActiveTab("achievement")}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === "achievement"
              ? "text-chimera-blue-400 border-b-2 border-chimera-blue-400"
              : "text-gray-500 hover:text-chimera-blue-500"
              }`}
          >
            Achievement
          </button>
          <button
            onClick={() => setActiveTab("reportCard")}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === "reportCard"
              ? "text-chimera-blue-400 border-b-2 border-chimera-blue-400"
              : "text-gray-500 hover:text-chimera-blue-500"
              }`}
          >
            Report Card
          </button>
        </div>
      </div>

      {activeTab === "overview" && (
        <OverviewTab trend={trend} courses={courses} />
      )}

      {activeTab === "grade" && <GradeTab subjects={subjects} />}

      {activeTab === "character" && (
        <CharacterTab
          characterPoints={characterPoints}
          loading={loading}
          dateFilter={characterFilter}
          setDateFilter={setCharacterFilter}
        />
      )}
    </div>
  );
}
