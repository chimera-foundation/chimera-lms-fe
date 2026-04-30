import React, { useMemo, useState } from "react";
import { AssessmentType } from "@/app/services/assessments-service";
import ClickAwayListener from "react-click-away-listener";

interface ExamProps {
  assessmentExam: AssessmentType | null;
  loading: boolean;
  dateFilter: "this_week" | "this_month" | "this_year";
  setDateFilter: (filter: "this_week" | "this_month" | "this_year") => void;
}

const statusConfig = {
  pending: {
    label: "Pending",
    badgeBg: "bg-orange-100 text-orange-600",
  },
  overdue: {
    label: "Overdue",
    badgeBg: "bg-red-100 text-red-600",
  },
  submitted: {
    label: "Submitted",
    badgeBg: "bg-blue-100 text-blue-600",
  },
  done: {
    label: "Done",
    badgeBg: "bg-green-100 text-green-600",
  },
};

export default function Exam({
  assessmentExam,
  loading,
  dateFilter,
  setDateFilter,
}: ExamProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDateFilterDropdown, setShowDateFilterDropdown] = useState(false);
  const [showStatusFilterPopup, setShowStatusFilterPopup] = useState(false);
  const [statusFilters, setStatusFilters] = useState({
    pending: false,
    overdue: false,
    submitted: false,
    done: false,
  });

  const filterLabels = {
    this_week: "This week",
    this_month: "This month",
    this_year: "This year",
  };

  const filteredAssessments = useMemo(() => {
    const exams = assessmentExam?.assessments || [];
    return exams.filter((item) => {
      const matchesSearch =
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase());

      const hasStatusFilter =
        statusFilters.pending ||
        statusFilters.overdue ||
        statusFilters.submitted ||
        statusFilters.done;
      const matchesStatus = !hasStatusFilter ||
        (statusFilters.pending && item.status.toLowerCase() === "pending") ||
        (statusFilters.overdue && item.status.toLowerCase() === "overdue") ||
        (statusFilters.submitted && item.status.toLowerCase() === "submitted") ||
        (statusFilters.done && item.status.toLowerCase() === "done");

      return matchesSearch && matchesStatus;
    });
  }, [assessmentExam, searchQuery, statusFilters]);

  const toggleStatusFilter = (key: keyof typeof statusFilters) => {
    setStatusFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getAttachmentIcon = () => (
    <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <path d="M14 3.5l5.5 5.5H14V3.5z" fill="white" opacity="0.3" />
    </svg>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="bg-gray-500 px-4 py-2 text-white text-sm font-bold">Pending</div>
          <div className="p-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-800">{assessmentExam?.summary.pending || 0}</span>
            <span className="text-gray-500 text-sm">Exam</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="bg-amber-500 px-4 py-2 text-white text-sm font-bold">Submitted</div>
          <div className="p-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-800">{assessmentExam?.summary.submitted || 0}</span>
            <span className="text-gray-500 text-sm">Exam</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="bg-green-600 px-4 py-2 text-white text-sm font-bold">Done</div>
          <div className="p-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-800">{assessmentExam?.summary.done || 0}</span>
            <span className="text-gray-500 text-sm">Exam</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="bg-red-600 px-4 py-2 text-white text-sm font-bold">Overdue</div>
          <div className="p-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-800">{assessmentExam?.summary.overdue || 0}</span>
            <span className="text-gray-500 text-sm">Exam</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm min-h-[400px]">
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
          <div className="relative w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subject, title, etc..."
              className="w-full pl-10 pr-4 py-2 bg-blue-50/50 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            />
            <svg className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <button
                onClick={() => setShowStatusFilterPopup(!showStatusFilterPopup)}
                className="px-4 py-2 text-sm bg-blue-700 hover:bg-blue-800 text-white rounded-lg flex items-center gap-2 transition-colors font-medium border border-white/10"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter
                <svg className={`w-3 h-3 transition-transform ${showStatusFilterPopup ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <ClickAwayListener onClickAway={() => setShowStatusFilterPopup(false)}>
                <div>
                  {showStatusFilterPopup && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-blue-800 text-white shadow-2xl z-50 p-2 border border-white/5">
                      <div className="space-y-1 text-sm">
                        <div className="px-3 py-1 text-[10px] font-bold text-blue-300 uppercase tracking-wider">Status</div>
                        {[
                          { key: "pending", label: "Pending" },
                          { key: "overdue", label: "Overdue" },
                          { key: "submitted", label: "Submitted" },
                          { key: "done", label: "Done" },
                        ].map((item) => (
                          <label key={item.key} className="flex items-center justify-between cursor-pointer rounded-lg px-3 py-2 hover:bg-white/5 transition-colors">
                            <span className="font-medium">{item.label}</span>
                            <input
                              type="checkbox"
                              checked={statusFilters[item.key as keyof typeof statusFilters]}
                              onChange={() => toggleStatusFilter(item.key as keyof typeof statusFilters)}
                              className="h-4 w-4 rounded border-white/20 bg-transparent text-blue-500 focus:ring-blue-500"
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ClickAwayListener>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowDateFilterDropdown(!showDateFilterDropdown)}
                className="px-4 py-2 text-sm bg-blue-700 hover:bg-blue-800 text-white rounded-lg flex items-center gap-2 transition-colors font-medium min-w-[120px] justify-between"
              >
                {filterLabels[dateFilter]}
                <svg className={`w-3 h-3 transition-transform ${showDateFilterDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showDateFilterDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-lg shadow-lg z-50 py-1">
                  {(["this_week", "this_month", "this_year"] as const).map((filter) => (
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
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-center">Subject</th>
                <th className="px-4 py-4 text-center">Title</th>
                <th className="px-4 py-4 text-center">Type</th>
                <th className="px-4 py-4 text-center">Subtype</th>
                <th className="px-4 py-4 text-center">Attachment</th>
                <th className="px-4 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    Loading exams...
                  </td>
                </tr>
              ) : filteredAssessments.length > 0 ? (
                filteredAssessments.map((item) => {
                  const statusKey = item.status.toLowerCase() as keyof typeof statusConfig;
                  const config = statusConfig[statusKey] || statusConfig.pending;

                  return (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-700 text-center">{item.subject}</td>
                      <td className="px-4 py-4 text-center text-gray-600">{item.title}</td>
                      <td className="px-4 py-4 text-center text-gray-600 capitalize">{item.type}</td>
                      <td className="px-4 py-4 text-center text-gray-600 capitalize">{item.sub_type.replace("_", " ")}</td>
                      <td className="px-4 py-4 text-center flex justify-center">
                        <a href={item.attachment_url} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
                          {getAttachmentIcon()}
                        </a>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.badgeBg}`}>
                          {config.label}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500 font-medium">
                    No exams found for this period.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

