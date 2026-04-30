"use client";
import React from "react";
import { TrendItem, CourseItem } from "@/app/models/grade";
import AverageGradeChart from "./average-chart";

interface OverviewTabProps {
  trend: TrendItem[];
  courses: CourseItem[];
}

export default function OverviewTab({ trend, courses }: OverviewTabProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center mb-4 justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Average Grade</h2>
      </div>
      <AverageGradeChart trend={trend} />

      <div className="mt-8 space-y-4">
        {courses.map((course, index) => {
          const colors = [
            { text: "text-red-700", bar: "bg-red-700", light: "bg-red-50" },
            { text: "text-stone-800", bar: "bg-stone-800", light: "bg-stone-50" },
            { text: "text-slate-800", bar: "bg-slate-800", light: "bg-slate-50" },
            { text: "text-fuchsia-900", bar: "bg-fuchsia-900", light: "bg-fuchsia-50" },
            { text: "text-amber-800", bar: "bg-amber-800", light: "bg-amber-50" },
            { text: "text-emerald-900", bar: "bg-emerald-900", light: "bg-emerald-50" },
          ];
          const color = colors[index % colors.length];

          return (
            <div key={course.courseId} className="flex items-center gap-6">
              <div className={`w-40 font-semibold ${color.text}`}>
                {course.courseName}
              </div>
              <div className={`w-14 font-bold ${color.text} text-lg`}>
                {course.average.toFixed(2)}
              </div>
              <div className={`flex-1 h-2.5 rounded-full ${color.light} overflow-hidden`}>
                <div
                  className={`h-full ${color.bar} rounded-full transition-all duration-1000 shadow-sm`}
                  style={{ width: `${course.average}%` }}
                />
              </div>
              <button className="px-4 py-1.5 text-sm bg-chimera-blue-500 hover:bg-chimera-blue-600 text-white rounded-lg flex items-center gap-2 transition-colors font-medium whitespace-nowrap shadow-sm">
                View Details
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
