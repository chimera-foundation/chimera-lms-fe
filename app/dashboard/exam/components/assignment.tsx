import React from "react";

export default function Assignment() {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-600 rounded-lg p-4 text-white">
          <div className="text-sm font-medium mb-1">Upcoming Assignment</div>
          <div className="text-2xl font-bold">
            TODO<span className="text-base font-normal ml-1">Assignment</span>
          </div>
        </div>
        <div className="bg-gray-600 rounded-lg p-4 text-white">
          <div className="text-sm font-medium mb-1">Upcoming Assignment</div>
          <div className="text-2xl font-bold mr">
            TODO<span className="text-base font-normal ml-1">Assignment</span>
          </div>
        </div>
        <div className="bg-gray-600 rounded-lg p-4 text-white">
          <div className="text-sm font-medium mb-1">Missed Assignment</div>
          <div className="text-2xl font-bold">
            TODO<span className="text-base font-normal ml-1">Assignment</span>
          </div>
        </div>
        <div className="bg-gray-600 rounded-lg p-4 text-white">
          <div className="text-sm font-medium mb-1">Missed Assignment</div>
          <div className="text-2xl font-bold">
            TODO<span className="text-base font-normal ml-1">Assignment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
