"use client";
import React, { useMemo, useState } from "react";
import { AttendanceRecord } from "@/app/models/attendance";
import ClickAwayListener from "react-click-away-listener";

interface RecordsTabProps {
  records: AttendanceRecord[];
  loading: boolean;
  total: number;
  currentPage: number;
  pageSize: number;
  dateFilter: string;
  setDateFilter: (filter: string) => void;
  setPage: (page: number) => void;
}

export default function RecordsTab({
  records,
  loading,
  total,
  currentPage,
  pageSize,
  dateFilter,
  setDateFilter,
  setPage,
}: RecordsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDateFilterDropdown, setShowDateFilterDropdown] = useState(false);

  const filterLabels: { [key: string]: string } = {
    this_week: "This week",
    this_month: "This month",
    this_year: "This year",
    this_semester: "This semester",
  };

  const filteredRecords = useMemo(() => {
    if (!searchQuery) return records;
    const q = searchQuery.toLowerCase();
    return records.filter(
      (r) =>
        r.date.toLowerCase().includes(q) ||
        r.day.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q),
    );
  }, [records, searchQuery]);

  const totalPages = Math.ceil(total / pageSize);
  const startItem = currentPage * pageSize + 1;
  const endItem = Math.min((currentPage + 1) * pageSize, total);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return "-";
    const [h, m] = timeStr.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${hour12}:${m} ${ampm}`;
  };

  const statusConfig: {
    [key: string]: { label: string; className: string };
  } = {
    present: {
      label: "Present",
      className:
        "bg-chimera-green-50 text-chimera-green-700 border border-chimera-green-200",
    },
    absent: {
      label: "Absent",
      className:
        "bg-chimera-red-50 text-chimera-red-700 border border-chimera-red-200",
    },
    late: {
      label: "Late",
      className:
        "bg-chimera-yellow-50 text-chimera-yellow-700 border border-chimera-yellow-200",
    },
    excused: {
      label: "Excused",
      className:
        "bg-chimera-blue-50 text-chimera-blue-700 border border-chimera-blue-200",
    },
  };

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      pages.push(0);
      if (currentPage > 2) pages.push("...");
      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPages - 2, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages - 1);
    }
    return pages;
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm min-h-[400px]">
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        <div className="relative w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search date, day, status..."
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
            {filterLabels[dateFilter] || "This semester"}
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
              <th className="px-6 py-4 font-semibold text-center">Date</th>
              <th className="px-4 py-4 text-center">Day</th>
              <th className="px-4 py-4 text-center">Status</th>
              <th className="px-4 py-4 text-center">Time In</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  Loading attendance records...
                </td>
              </tr>
            ) : filteredRecords.length > 0 ? (
              filteredRecords.map((record) => {
                const config = statusConfig[record.status] || {
                  label: record.status,
                  className: "bg-gray-100 text-gray-600",
                };
                return (
                  <tr
                    key={record.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-center text-gray-700 font-medium">
                      {formatDate(record.date)}
                    </td>
                    <td className="px-4 py-4 text-center text-gray-600">
                      {record.day}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${config.className}`}
                      >
                        {config.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center text-gray-600">
                      {formatTime(record.timeIn)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-gray-500 font-medium"
                >
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!loading && total > 0 && (
        <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Showing {startItem}-{endItem} of {total}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 0}
              className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            {getPageNumbers().map((page, i) =>
              page === "..." ? (
                <span key={`dots-${i}`} className="px-2 text-gray-400 text-sm">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setPage(page as number)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                      ? "bg-chimera-blue-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {(page as number) + 1}
                </button>
              ),
            )}
            <button
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
