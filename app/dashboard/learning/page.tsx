"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { getLearningCourses } from "@/app/redux/learning/learning-slice";
import CourseList from "./components/course-list";

export default function LearningMaterialPage() {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<
    "material" | "ebook" | "video" | "lab"
  >("material");

  const { courses, loading } = useAppSelector((state) => state.learning);

  useEffect(() => {
    dispatch(getLearningCourses());
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Learning Material</h1>

        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("material")}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === "material"
              ? "text-chimera-blue-400 border-b-2 border-chimera-blue-400"
              : "text-gray-500 hover:text-chimera-blue-500"
              }`}
          >
            Learning Material
          </button>
          <button
            onClick={() => setActiveTab("ebook")}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === "ebook"
              ? "text-chimera-blue-400 border-b-2 border-chimera-blue-400"
              : "text-gray-500 hover:text-chimera-blue-500"
              }`}
          >
            E-Book
          </button>
          <button
            onClick={() => setActiveTab("video")}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === "video"
              ? "text-chimera-blue-400 border-b-2 border-chimera-blue-400"
              : "text-gray-500 hover:text-chimera-blue-500"
              }`}
          >
            Video
          </button>
          <button
            onClick={() => setActiveTab("lab")}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === "lab"
              ? "text-chimera-blue-400 border-b-2 border-chimera-blue-400"
              : "text-gray-500 hover:text-chimera-blue-500"
              }`}
          >
            Digital Lab
          </button>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "material" && (
          <CourseList courses={courses} loading={loading} />
        )}
        
        {activeTab === "ebook" && (
          <div className="flex justify-center py-20 text-gray-500">
            E-Book content coming soon...
          </div>
        )}

        {activeTab === "video" && (
          <div className="flex justify-center py-20 text-gray-500">
            Video content coming soon...
          </div>
        )}

        {activeTab === "lab" && (
          <div className="flex justify-center py-20 text-gray-500">
            Digital Lab content coming soon...
          </div>
        )}
      </div>
    </div>
  );
}
