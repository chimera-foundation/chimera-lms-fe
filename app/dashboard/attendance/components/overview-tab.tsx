"use client";
import React, { useState } from "react";
import { AttendanceRecord } from "@/app/models/attendance";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
);

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface OverviewTabProps {
  records: AttendanceRecord[];
}

function getMonthlyStats(records: AttendanceRecord[]) {
  const monthMap: { [key: string]: { present: number; absent: number; excused: number; late: number; total: number } } = {};

  records.forEach((r) => {
    const month = r.date.substring(0, 7);
    if (!monthMap[month]) {
      monthMap[month] = { present: 0, absent: 0, excused: 0, late: 0, total: 0 };
    }
    monthMap[month].total++;
    if (r.status === "present") monthMap[month].present++;
    else if (r.status === "absent") monthMap[month].absent++;
    else if (r.status === "excused") monthMap[month].excused++;
    else if (r.status === "late") monthMap[month].late++;
  });

  const sortedMonths = Object.keys(monthMap).sort();
  return sortedMonths.map((m) => {
    const stats = monthMap[m];
    const monthIndex = parseInt(m.split("-")[1]) - 1;
    return {
      label: MONTH_NAMES[monthIndex],
      presentPct: stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0,
      absentPct: stats.total > 0 ? Math.round((stats.absent / stats.total) * 100) : 0,
      excusedPct: stats.total > 0 ? Math.round((stats.excused / stats.total) * 100) : 0,
    };
  });
}

function AttendanceChart({ records }: { records: AttendanceRecord[] }) {
  const stats = getMonthlyStats(records);

  const data: ChartData<"line", number[], string> = {
    labels: stats.map((s) => s.label),
    datasets: [
      {
        label: "  Present Days",
        data: stats.map((s) => s.presentPct),
        borderColor: "#4cb050",
        backgroundColor: "rgba(76, 176, 80, 0.1)",
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#4cb050",
        fill: false,
      },
      {
        label: "  Absent Days",
        data: stats.map((s) => s.absentPct),
        borderColor: "#f54337",
        backgroundColor: "rgba(245, 67, 55, 0.1)",
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#f54337",
        fill: false,
      },
      {
        label: "  Excused Days",
        data: stats.map((s) => s.excusedPct),
        borderColor: "#fec107",
        backgroundColor: "rgba(254, 193, 7, 0.1)",
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#fec107",
        fill: false,
      },
    ],
  };
  console.log(data)
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: (value) => `${value}%`,
        },
        grid: {
          color: "#f0f0f0",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="h-[400px] w-full">
      <Line data={data} options={options} />
    </div>
  );
}

function AttendanceCalendar({ records, year, month, onPrev, onNext }: { records: AttendanceRecord[]; year: number; month: number; onPrev: () => void; onNext: () => void }) {
  const now = new Date();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  const startDow = (firstDay.getDay() + 6) % 7;

  const recordMap: { [key: string]: AttendanceRecord } = {};
  records.forEach((r) => {
    recordMap[r.date] = r;
  });

  const statusColors: { [key: string]: string } = {
    present: "bg-chimera-green-400 text-white",
    absent: "bg-chimera-red-500 text-white",
    late: "bg-chimera-yellow-400 text-white",
    excused: "bg-chimera-blue-200 text-chimera-blue-800",
  };

  const cells: React.ReactNode[] = [];

  for (let i = 0; i < startDow; i++) {
    cells.push(<div key={`empty-${i}`} className="p-2 min-h-[64px]" />);
  }

  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const record = recordMap[dateStr];
    const isToday =
      day === now.getDate() &&
      month === now.getMonth() &&
      year === now.getFullYear();

    const colorClass = record
      ? statusColors[record.status] || "bg-gray-100"
      : "bg-white";

    cells.push(
      <div
        key={day}
        className={`p-2 min-h-[64px] rounded-lg border transition-all ${isToday ? "border-chimera-blue-500 ring-2 ring-chimera-blue-200" : "border-gray-200"
          } ${colorClass}`}
      >
        <span className="text-sm font-bold">{day}</span>
        <span className="text-[10px] ml-1 opacity-70">
          {dayLabels[(startDow + day - 1) % 7]}
        </span>
      </div>,
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onPrev}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-gray-700">
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          onClick={onNext}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayLabels.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-gray-500 py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{cells}</div>
      <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-chimera-green-400" />
          Present
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-chimera-red-500" />
          Absent
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-chimera-yellow-400" />
          Late
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-chimera-blue-200" />
          Excused
        </div>
      </div>
    </div>
  );
}

export default function OverviewTab({ records }: OverviewTabProps) {
  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());

  const handlePrevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else {
      setCalMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else {
      setCalMonth((m) => m + 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Monthly Attendance Overview</h2>
        </div>
        <AttendanceChart records={records} />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Attendance Calendar</h2>
        </div>
        <AttendanceCalendar
          records={records}
          year={calYear}
          month={calMonth}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
        />
      </div>
    </div>
  );
}
