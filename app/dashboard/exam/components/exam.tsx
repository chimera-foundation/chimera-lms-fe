import React from "react";

export default function Exam() {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-600 rounded-lg p-4 text-white">
          <div className="text-sm font-medium mb-1">Upcoming Exam</div>
          <div className="text-2xl font-bold">
            TODO<span className="text-base font-normal ml-1">Exam</span>
          </div>
        </div>
        <div className="bg-gray-600 rounded-lg p-4 text-white">
          <div className="text-sm font-medium mb-1">Upcoming Exam</div>
          <div className="text-2xl font-bold mr">
            TODO<span className="text-base font-normal ml-1">Exam</span>
          </div>
        </div>
        <div className="bg-gray-600 rounded-lg p-4 text-white">
          <div className="text-sm font-medium mb-1">Missed Exam</div>
          <div className="text-2xl font-bold">
            TODO<span className="text-base font-normal ml-1">Exam</span>
          </div>
        </div>
        <div className="bg-gray-600 rounded-lg p-4 text-white">
          <div className="text-sm font-medium mb-1">Missed Exam</div>
          <div className="text-2xl font-bold">
            TODO<span className="text-base font-normal ml-1">Exam</span>
          </div>
        </div>
      </div>
    </div>
  );
}
