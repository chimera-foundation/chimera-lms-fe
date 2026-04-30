"use client";
import React from "react";
import { EventItem } from "@/app/models/event";

interface EventDetailsProps {
  events: EventItem[];
}

export const EventDetails: React.FC<EventDetailsProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 h-full flex items-center justify-center">
        <p className="text-gray-500 text-center">
          Select a date to view events
        </p>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Events ({events.length})
      </h3>

      <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        {events.map((event) => (
          <div
            key={event.ID}
            style={{ backgroundColor: event.Color }}
            className="text-white rounded-lg p-4 space-y-3"
          >
            <div>
              <span className="inline-block bg-white/40 text-white text-xs px-2 py-1 rounded">
                {event.EventType.toUpperCase()}
              </span>
            </div>

            <h4 className="text-lg font-semibold">"{event.Title}"</h4>

            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm">
                {formatDate(new Date(event.StartAt))}
              </span>
            </div>

            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm">
                {new Date(event.StartAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}{" "}
                -{" "}
                {new Date(event.EndAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
            </div>

            {event.Location && (
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm">{event.Location}</span>
              </div>
            )}

            <div className="pt-3 border-t border-gray-600">
              <p className="text-sm font-medium mb-2">Assigned By</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-xs">
                  {event.CreatedBy
                    ? event.CreatedBy.charAt(0).toUpperCase()
                    : ""}
                </div>
                <span className="text-sm">{event.CreatedBy || "-"}</span>
              </div>
            </div>

            {event.Description && (
              <div className="pt-3 border-t border-gray-600">
                <p className="text-sm font-medium mb-2">Note</p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {event.Description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
