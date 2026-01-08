import ChevronDownIcon from "@/app/components/icons/chevron-down-icon";
import ChevronUpIcon from "@/app/components/icons/chevron-up-icon";
import { useAppSelector } from "@/app/redux/hooks";
import { useState } from "react";

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-orange-50 text-orange-600",
    badgeBg: "bg-orange-100 text-orange-600",
  },
  overdue: {
    label: "Overdue",
    color: "bg-red-50 text-red-600",
    badgeBg: "bg-red-100 text-red-600",
  },
  submitted: {
    label: "Submitted",
    color: "bg-blue-50 text-blue-600",
    badgeBg: "bg-blue-100 text-blue-600",
  },
  done: {
    label: "Done",
    color: "bg-green-50 text-green-600",
    badgeBg: "bg-green-100 text-green-600",
  },
};

export default function Exams() {
  const { exam, loading } = useAppSelector((x) => x.dashboard);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getStatusCount = (status: string) => {
    return (
      exam?.status_counts?.find((s) => s.status.toLowerCase() === status)
        ?.count || 0
    );
  };

  console.log(exam?.status_counts);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAttachmentIcon = (type: string) => {
    if (type === "pdf" || type === "document") {
      return (
        <svg
          className="w-4 h-4 text-red-400"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
        </svg>
      );
    }
    return (
      <svg
        className="w-4 h-4 text-gray-400"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      </svg>
    );
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h2 className="text-lg font-bold text-gray-900">Exam</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {currentMonth.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <div className="flex flex-col gap-0.5">
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={() =>
                setCurrentMonth(
                  new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
                )
              }
            >
              <ChevronUpIcon className="w-4 h-4" />
            </button>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={() =>
                setCurrentMonth(
                  new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
                )
              }
            >
              <ChevronDownIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-4 flex-shrink-0">
        {(["pending", "overdue", "submitted", "done"] as const).map(
          (status) => {
            const config = statusConfig[status];
            const count = getStatusCount(status);

            return (
              <div
                key={status}
                className={`${config.color} rounded-lg p-3 flex items-center justify-between`}
              >
                <span className="text-sm font-medium">{config.label}</span>
                <span className="text-2xl font-bold">{count}</span>
              </div>
            );
          }
        )}
      </div>

      <div className="flex-1 overflow-auto no-scrollbar">
        <table className="w-full">
          <thead className="sticky top-0 bg-white">
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-3 text-xs font-medium text-gray-500">
                Subject
              </th>
              <th className="text-left py-3 px-3 text-xs font-medium text-gray-500">
                Title
              </th>
              <th className="text-left py-3 px-3 text-xs font-medium text-gray-500">
                Attachment
              </th>
              <th className="text-left py-3 px-3 text-xs font-medium text-gray-500">
                Status
              </th>
              <th className="text-left py-3 px-3 text-xs font-medium text-gray-500">
                Due Date
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-sm text-gray-500"
                >
                  Loading...
                </td>
              </tr>
            ) : exam?.items && exam.items.length > 0 ? (
              exam.items.map((assignment) => {
                const statusKey =
                  assignment.status.toLowerCase() as keyof typeof statusConfig;
                const config = statusConfig[statusKey] || statusConfig.pending;

                return (
                  <tr key={assignment.id} className="border-b border-gray-100">
                    <td className="py-3 px-3 text-sm text-gray-900">
                      {assignment.subject}
                    </td>
                    <td className="py-3 px-3 text-sm text-gray-900">
                      {assignment.title}
                    </td>
                    <td className="py-3 px-3">
                      {getAttachmentIcon(assignment.attachment_type)}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.badgeBg}`}
                      >
                        {config.label}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-sm text-gray-500">
                      {formatDate(assignment.due_date)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-sm text-gray-500"
                >
                  No exam found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
