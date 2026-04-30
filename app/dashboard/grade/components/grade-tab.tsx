"use client";
import React, { useState, useMemo } from "react";
import { Subjects } from "@/app/models/grade";

interface GradeTabProps {
  subjects: Subjects[];
}

export default function GradeTab({ subjects }: GradeTabProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) =>
      subject.subjectName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [subjects, searchQuery]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        <div className="relative w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subject..."
            className="w-full pl-10 pr-4 py-2 bg-chimera-blue-50/50 border border-chimera-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-chimera-blue-400 focus:border-transparent transition-all"
          />
          <svg
            className="absolute left-3 top-2.5 h-4 w-4 text-chimera-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 font-medium border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-center">Subject</th>
              <th className="px-4 py-4 text-center">Homework</th>
              <th className="px-4 py-4 text-center">Exercise</th>
              <th className="px-4 py-4 text-center">Quiz</th>
              <th className="px-4 py-4 text-center">Assessment</th>
              <th className="px-4 py-4 text-center">Midterm Exam</th>
              <th className="px-4 py-4 text-center">Practical Exam</th>
              <th className="px-4 py-4 text-center">Final Exam</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredSubjects.map((subject) => (
              <tr
                key={subject.subjectId}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-700 text-center">
                  {subject.subjectName}
                </td>
                {[
                  { label: "Homework", key: "homework" },
                  { label: "Exercise", key: "exercise" },
                  { label: "Quiz", key: "quiz" },
                  { label: "Assessment", key: "assessment_exam" },
                  { label: "Midterm Exam", key: "midterm_exam" },
                  { label: "Practical Exam", key: "practical_exam" },
                  { label: "Final Exam", key: "final_exam" },
                ].map((column) => {
                  const avg = subject.typeAverages.find(
                    (t) => t.type === column.key,
                  );
                  return (
                    <td
                      key={column.key}
                      className="px-4 py-4 text-center text-gray-600"
                    >
                      {avg ? avg.average.toFixed(0) : "-"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
