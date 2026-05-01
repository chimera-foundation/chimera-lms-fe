import React from "react";
import { LearningCourse } from "@/app/models/learning";

interface CourseListProps {
  courses: LearningCourse[];
  loading: boolean;
}

export default function CourseList({ courses, loading }: CourseListProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-20 text-gray-500">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">My Courses</h2>
        <div className="relative">
          <button className="bg-blue-800 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
            S1, 2024/2025
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-blue-50/50 rounded-xl p-4 border border-blue-100/50 hover:shadow-md transition-shadow cursor-pointer">
            <h3 className="text-lg font-bold text-gray-800 mb-4">{course.title.split(' ')[0]}</h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <p className="text-gray-400 font-medium">Teacher</p>
                <p className="text-gray-700 font-bold">{course.teacher_name}</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Class Subject</p>
                <p className="text-gray-700 font-bold">{course.subject_code}</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Optimal Study Period</p>
                <p className="text-gray-700 font-bold">{course.periods_per_week} Period / Week</p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-gray-400">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <span className="ml-2">{course.progress}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
