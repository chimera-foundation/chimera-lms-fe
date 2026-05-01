import React, { useMemo, useState } from "react";
import { CharacterPoint } from "@/app/models/grade";
import ClickAwayListener from "react-click-away-listener";

interface CharacterTabProps {
  characterPoints: CharacterPoint[];
  loading: boolean;
  dateFilter: string;
  setDateFilter: (filter: string) => void;
}

export default function CharacterTab({
  characterPoints,
  loading,
  dateFilter,
  setDateFilter,
}: CharacterTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDateFilterDropdown, setShowDateFilterDropdown] = useState(false);

  const filterLabels: { [key: string]: string } = {
    this_week: "This week",
    this_month: "This month",
    this_year: "This year",
  };

  const summary = useMemo(() => {
    let award = 0;
    let violation = 0;
    characterPoints.forEach((p) => {
      if (p.point > 0) award += p.point;
      else violation += Math.abs(p.point);
    });
    return {
      award,
      violation,
      total: award - violation,
    };
  }, [characterPoints]);

  const filteredPoints = useMemo(() => {
    return characterPoints.filter((item) => {
      return (
        item.note.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.givenBy.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [characterPoints, searchQuery]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="bg-green-600 px-4 py-2 text-white text-sm font-bold">Award</div>
          <div className="p-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-800">{summary.award}</span>
            <span className="text-gray-500 text-sm">Point</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="bg-red-500 px-4 py-2 text-white text-sm font-bold">Violation</div>
          <div className="p-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-800">{summary.violation}</span>
            <span className="text-gray-500 text-sm">Point</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="bg-amber-500 px-4 py-2 text-white text-sm font-bold">Total Point</div>
          <div className="p-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-800">{summary.total}</span>
            <span className="text-gray-500 text-sm">Point</span>
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
              placeholder="Search note, category, etc..."
              className="w-full pl-10 pr-4 py-2 bg-blue-50/50 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            />
            <svg className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <button
                onClick={() => setShowDateFilterDropdown(!showDateFilterDropdown)}
                className="px-4 py-2 text-sm bg-blue-700 hover:bg-blue-800 text-white rounded-lg flex items-center gap-2 transition-colors font-medium min-w-[120px] justify-between"
              >
                {filterLabels[dateFilter] || "This week"}
                <svg className={`w-3 h-3 transition-transform ${showDateFilterDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showDateFilterDropdown && (
                <ClickAwayListener onClickAway={() => setShowDateFilterDropdown(false)}>
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
                </ClickAwayListener>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-center w-24">Point</th>
                <th className="px-4 py-4 text-center w-40">Date</th>
                <th className="px-4 py-4 text-left">Note</th>
                <th className="px-4 py-4 text-center w-32">Category</th>
                <th className="px-6 py-4 text-center w-40">Given by</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    Loading character points...
                  </td>
                </tr>
              ) : filteredPoints.length > 0 ? (
                filteredPoints.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className={`px-6 py-4 font-bold text-center ${item.point > 0 ? "text-green-600" : "text-red-600"}`}>
                      {item.point > 0 ? `+${item.point}` : item.point}
                    </td>
                    <td className="px-4 py-4 text-center text-gray-600">
                      {formatDate(item.dateGiven)}
                    </td>
                    <td className="px-4 py-4 text-left text-gray-700 font-medium">
                      {item.note}
                    </td>
                    <td className="px-4 py-4 text-center text-gray-600 capitalize">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {item.givenBy}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500 font-medium">
                    No character points found for this period.
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
