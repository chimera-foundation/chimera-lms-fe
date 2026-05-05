"use client";
import React, { useMemo, useState } from "react";
import { SubjectAttendance } from "@/app/models/attendance";
import ClickAwayListener from "react-click-away-listener";

interface SubjectTabProps {
  subjectAttendance: SubjectAttendance[];
  loading: boolean;
  dateFilter: string;
  setDateFilter: (filter: string) => void;
}

export default function SubjectTab({
  subjectAttendance,
  loading,
  dateFilter,
  setDateFilter,
}: SubjectTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDateFilterDropdown, setShowDateFilterDropdown] = useState(false);

  const filterLabels: { [key: string]: string } = {
    this_week: "This week",
    this_month: "This month",
    this_year: "This year",
    this_semester: "This semester",
  };

  const filteredSubjects = useMemo(() => {
    if (!searchQuery) return subjectAttendance;
    const q = searchQuery.toLowerCase();
    return subjectAttendance.filter((s) =>
      s.subjectName.toLowerCase().includes(q),
    );
  }, [subjectAttendance, searchQuery]);

  const getPercentageColor = (pct: number) => {
    if (pct >= 90) return "text-chimera-green-600 font-bold";
    if (pct >= 75) return "text-chimera-yellow-600 font-bold";
    return "text-chimera-red-600 font-bold";
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm min-h-[400px]">
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

        <div className="relative">
          <button
            onClick={() => setShowDateFilterDropdown(!showDateFilterDropdown)}
            className="px-4 py-2 text-sm bg-chimera-blue-700 hover:bg-chimera-blue-800 text-white rounded-lg flex items-center gap-2 transition-colors font-medium min-w-[140px] justify-between"
          >
            {filterLabels[dateFilter] || "This month"}
            <svg
              className={`w-3 h-3 transition-transform ${showDateFilterDropdown ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {showDateFilterDropdown && (
            <ClickAwayListener
              onClickAway={() => setShowDateFilterDropdown(false)}
            >
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-lg shadow-lg z-50 py-1">
                {(
                  [
                    "this_week",
                    "this_month",
                    "this_year",
                    "this_semester",
                  ] as const
                ).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setDateFilter(filter);
                      setShowDateFilterDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors ${dateFilter === filter ? "text-blue-600 font-bold bg-blue-50/50" : "text-gray-600"}`}
                  >
                    {filterLabels[filter]}
                  </button>
                ))}
              </div>
            </ClickAwayListener>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 font-medium border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-center">Subject</th>
              <th className="px-4 py-4 text-center">Total Classes</th>
              <th className="px-4 py-4 text-center">Present</th>
              <th className="px-4 py-4 text-center">Late</th>
              <th className="px-4 py-4 text-center">Absent</th>
              <th className="px-4 py-4 text-center">Attendance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  Loading subject attendance...
                </td>
              </tr>
            ) : filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject, index) => (
                <tr
                  key={`${subject.subjectName}-${index}`}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-center text-gray-700 font-medium">
                    {subject.subjectName}
                  </td>
                  <td className="px-4 py-4 text-center text-gray-600">
                    {subject.totalClasses}
                  </td>
                  <td className="px-4 py-4 text-center text-gray-600">
                    {subject.presentCount}
                  </td>
                  <td className="px-4 py-4 text-center text-gray-600">
                    {subject.lateCount}
                  </td>
                  <td className="px-4 py-4 text-center text-gray-600">
                    {subject.absentCount}
                  </td>
                  <td
                    className={`px-4 py-4 text-center ${getPercentageColor(subject.attendancePercentage)}`}
                  >
                    {subject.attendancePercentage}%
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-gray-500 font-medium"
                >
                  No subject attendance data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!loading && filteredSubjects.length > 0 && (
        <div className="px-6 py-3 border-t border-gray-100 text-sm text-gray-500">
          Showing {filteredSubjects.length} of {subjectAttendance.length}{" "}
          subjects
        </div>
      )}
    </div>
  );
}
