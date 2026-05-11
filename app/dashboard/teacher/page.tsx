"use client";

import { useState } from "react";
import {
  SearchIcon,
  FilterIcon,
  MessageIcon,
  EnvelopeIcon,
  ClockIcon,
  BuildingIcon,
  AcademicCapIcon,
  BookIcon,
} from "./icons";
import { useAppSelector } from "../../redux/hooks";

const DUMMY_TEACHERS = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: "Teacher",
  subject: "Mathematics",
  role: "Senior Mathematics Teacher, Grade 11 Homeroom",
  tags: ["High School", "Grade 11-12"],
  bio: "Teacher is a passionate mathematics educator who believes in making complex concepts accessible to all students. With over 12 years of teaching experience, he has developed numerous innovative approaches to mathematics education that have helped countless students excel in their studies.",
  email: "john.smith@school.edu",
  officeHour: "Monday - Friday, 2:00 PM - 4:00 PM",
  classes: ["Grade 11A - Advanced Mathematics", "Mathematics Club (Co-curricular)"],
  qualifications: [
    "Master of Education (M.Ed.)",
    "Bachelor of Science (B.S.)",
    "Certified Advanced Mathematics Teacher",
  ],
  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
}));

export default function TeacherPage() {
  const { currentUser } = useAppSelector((x) => x.messaging);
  const [view, setView] = useState<"grid" | "profile">("grid");
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);

  const handleViewProfile = (teacher: any) => {
    setSelectedTeacher(teacher);
    setView("profile");
  };

  const handleBack = () => {
    setView("grid");
    setSelectedTeacher(null);
  };

  return (
    <div className="p-6 min-h-screen bg-slate-50 overflow-y-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Teacher</h1>
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={handleBack}
              className="pb-2 text-[15px] font-medium transition text-blue-600 border-b-2 border-blue-600"
            >
              Teacher
            </button>
            {view === "profile" && (
              <div className="pb-2 text-[15px] font-medium text-gray-500 border-b-2 border-transparent flex items-center gap-2">
                <span className="text-gray-300">/</span>
                {selectedTeacher?.name}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="text-left">
            <p className="font-semibold text-gray-800 leading-tight">
              {currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : "John Doe"}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {currentUser?.roles || "Student"}
            </p>
          </div>
        </div>
      </div>

      {view === "grid" ? (
        <>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex w-full sm:w-auto flex-1 items-center gap-3">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-blue-200 rounded-md leading-5 bg-blue-50/50 placeholder-blue-300 text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="Search subject, subtype, etc..."
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition">
                <FilterIcon className="h-4 w-4" />
                Filter
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {DUMMY_TEACHERS.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-[#d7e3fc] rounded-xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition p-6 items-center text-center"
              >
                <div className="w-28 h-28 mb-4 relative rounded-full overflow-hidden border-4 border-white shadow-sm">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {teacher.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{teacher.subject}</p>

                <div className="flex gap-2 justify-center mb-4 flex-wrap">
                  {teacher.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-[10px] font-bold text-white bg-blue-500 px-2.5 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-gray-500 mb-6 flex-1 px-2">
                  {teacher.role}
                </p>

                <button
                  onClick={() => handleViewProfile(teacher)}
                  className="w-full py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition shadow-sm"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start mb-10 pb-10 border-b border-gray-100">
            <div className="w-48 h-48 flex-shrink-0 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={selectedTeacher.image}
                alt={selectedTeacher.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col items-start">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {selectedTeacher.name}
              </h2>
              <p className="text-lg text-gray-600 mb-4">{selectedTeacher.subject}</p>

              <p className="text-sm font-medium text-gray-700 mb-3">
                {selectedTeacher.role}
              </p>

              <div className="flex gap-2 mb-5">
                {selectedTeacher.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="text-xs font-bold text-white bg-blue-500 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-600 mb-6 max-w-4xl leading-relaxed">
                {selectedTeacher.bio}
              </p>

              <button className="flex items-center gap-2 px-8 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition shadow-sm shadow-blue-500/30">
                <MessageIcon className="h-4 w-4" />
                Message
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="flex flex-col gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3 text-gray-600">
                  <EnvelopeIcon className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">Contact Information</h3>
                </div>
                <div className="bg-[#4262c5] text-white p-4 rounded-lg text-sm font-medium shadow-sm">
                  {selectedTeacher.email}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3 text-gray-600">
                  <ClockIcon className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">Office Hour</h3>
                </div>
                <div className="bg-[#4262c5] text-white p-4 rounded-lg text-sm font-medium shadow-sm">
                  {selectedTeacher.officeHour}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3 text-gray-600">
                  <BuildingIcon className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">Classes Taught</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {selectedTeacher.classes.map((cls: string, i: number) => (
                    <div
                      key={i}
                      className="bg-[#4262c5] text-white p-4 rounded-lg text-sm font-medium shadow-sm"
                    >
                      {cls}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3 text-gray-600">
                  <AcademicCapIcon className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">Qualifications & Credentials</h3>
                </div>
                <div className="bg-[#4262c5] text-white p-5 rounded-lg text-sm shadow-sm leading-relaxed">
                  <ul className="list-disc list-inside space-y-1">
                    {selectedTeacher.qualifications.map(
                      (qual: string, i: number) => (
                        <li key={i}>{qual}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3 text-gray-600">
                  <BookIcon className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">Subject</h3>
                </div>
                <div className="bg-[#4262c5] text-white p-4 rounded-lg text-sm font-medium shadow-sm">
                  {selectedTeacher.subject}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
