"use client";
import {
  getAttendance,
  getAttendanceOverview,
  getSubjectAttendance,
} from "@/app/redux/attendance/attendance-slice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import OverviewTab from "./components/overview-tab";
import RecordsTab from "./components/records-tab";
import SubjectTab from "./components/subject-tab";
import { useEffect, useState } from "react";

const PAGE_SIZE = 20;

export default function AttendancePage() {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<
    "overview" | "records" | "subjectWise"
  >("overview");

  const [recordsFilter, setRecordsFilter] = useState("this_semester");
  const [recordsPage, setRecordsPage] = useState(0);

  const [subjectFilter, setSubjectFilter] = useState("this_month");

  const { summary, records, overviewRecords, subjectAttendance, total, loading } =
    useAppSelector((x) => x.attendance);

  useEffect(() => {
    dispatch(getAttendanceOverview({ filter: "this_year" }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getAttendance({
        filter: recordsFilter,
        limit: PAGE_SIZE,
        offset: recordsPage * PAGE_SIZE,
      }),
    );
  }, [dispatch, recordsFilter, recordsPage]);

  useEffect(() => {
    if (activeTab === "subjectWise") {
      dispatch(getSubjectAttendance({ filter: subjectFilter }));
    }
  }, [dispatch, activeTab, subjectFilter]);

  const handleRecordsFilterChange = (filter: string) => {
    setRecordsFilter(filter);
    setRecordsPage(0);
  };

  const tabs = [
    { key: "overview" as const, label: "Overview" },
    { key: "records" as const, label: "Attendance Record" },
    { key: "subjectWise" as const, label: "Subject Wise" },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Attendance</h1>

        <div className="flex gap-4 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 font-medium transition-colors ${activeTab === tab.key
                ? "text-chimera-blue-400 border-b-2 border-chimera-blue-400"
                : "text-gray-500 hover:text-chimera-blue-500"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="bg-chimera-blue-500 px-4 py-2 text-white text-sm font-bold">
            Overall Attendance
          </div>
          <div className="p-4">
            <span className="text-3xl font-bold text-gray-800">
              {summary ? `${summary.overallPercentage}%` : "-"}
            </span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="bg-chimera-green-500 px-4 py-2 text-white text-sm font-bold">
            Present Days
          </div>
          <div className="p-4">
            <span className="text-3xl font-bold text-gray-800">
              {summary ? summary.presentDays : "-"}
            </span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="bg-chimera-red-500 px-4 py-2 text-white text-sm font-bold">
            Absent Days
          </div>
          <div className="p-4">
            <span className="text-3xl font-bold text-gray-800">
              {summary ? summary.absentDays : "-"}
            </span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="bg-chimera-yellow-500 px-4 py-2 text-white text-sm font-bold">
            Excused Days
          </div>
          <div className="p-4">
            <span className="text-3xl font-bold text-gray-800">
              {summary ? summary.excusedDays : "-"}
            </span>
          </div>
        </div>
      </div>

      {activeTab === "overview" && <OverviewTab records={overviewRecords} />}

      {activeTab === "records" && (
        <RecordsTab
          records={records}
          loading={loading}
          total={total}
          currentPage={recordsPage}
          pageSize={PAGE_SIZE}
          dateFilter={recordsFilter}
          setDateFilter={handleRecordsFilterChange}
          setPage={setRecordsPage}
        />
      )}

      {activeTab === "subjectWise" && (
        <SubjectTab
          subjectAttendance={subjectAttendance}
          loading={loading}
          dateFilter={subjectFilter}
          setDateFilter={setSubjectFilter}
        />
      )}
    </div>
  );
}
