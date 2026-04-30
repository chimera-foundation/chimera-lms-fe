"use client";

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
} from "chart.js";
import { Line } from "react-chartjs-2";
import { TrendItem } from "@/app/models/grade";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
);

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const toMonthLabel = (label: string) => {
  const monthValue = Number(label.split("-")[1]);
  if (Number.isNaN(monthValue) || monthValue < 1 || monthValue > 12) {
    return label;
  }

  return MONTH_NAMES[monthValue - 1];
};

interface AverageGradeChartProps {
  trend: TrendItem[];
}

export default function AverageGradeChart({ trend }: AverageGradeChartProps) {
  const data: ChartData<"line", number[], string> = {
    labels: trend.map((item) => toMonthLabel(item.label)),
    datasets: [
      {
        label: "Average",
        data: trend.map((item) => Number(item.average.toFixed(2))),
        borderColor: "#e91e63",
        backgroundColor: "#e91e63",
        tension: 0.4,
        cubicInterpolationMode: "monotone",
        pointRadius: 5,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          generateLabels: (chart) => {
            const original =
              ChartJS.defaults.plugins.legend.labels.generateLabels(chart);

            return original.map((label) => ({
              ...label,
              text: "  " + label.text,
            }));
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
        },
        grid: {
          color: "#eee",
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
    <div className="h-[465px] w-full">
      <Line data={data} options={options} className="h-full w-full" />
    </div>
  );
}
