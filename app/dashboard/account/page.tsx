"use client";

import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { CheckIcon, InfoIcon, AlertIcon, TrashIcon, MonitorIcon, SunIcon, MoonIcon } from "./icons";

const TABS = ["Profile", "Medical", "Education", "Guardian", "Security", "Preferences"];

const GUARDIANS = [
  {
    id: 1,
    name: "Sarah Johnson",
    isPrimary: true,
    relation: "Mother",
    job: "Senior Marketing Manager",
    phone: "+62 811-2345-6789",
    email: "sarah.johnson@email.com",
    financial: "Yes",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: 2,
    name: "Michael Johnson",
    isPrimary: false,
    relation: "Father",
    job: "Software Engineer",
    phone: "+62 811-2345-6789",
    email: "sarah.johnson@email.com",
    financial: "No",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: 3,
    name: "Margaret Wilson",
    isPrimary: false,
    relation: "Grandmother",
    job: "Housewife",
    phone: "+62 811-2345-6789",
    email: "sarah.johnson@email.com",
    financial: "No",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
  },
];

const RECENT_LOGINS = [
  {
    id: 1,
    device: "Chrome on Windows 11",
    location: "Jakarta, Indonesia • 203.194.112.45",
    date: "March 2nd 2025, 07.00 AM",
    status: "Success",
  },
  {
    id: 2,
    device: "Chrome on Windows 11",
    location: "Jakarta, Indonesia • 203.194.112.45",
    date: "March 2nd 2025, 07.00 AM",
    status: "Failed",
  },
  {
    id: 3,
    device: "Chrome on Windows 11",
    location: "Jakarta, Indonesia • 203.194.112.45",
    date: "March 2nd 2025, 07.00 AM",
    status: "Success",
  },
];

export default function AccountPage() {
  const { currentUser } = useAppSelector((x) => x.messaging);
  const [activeTab, setActiveTab] = useState<string>("Profile");

  const renderProfileTab = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-[#e4ebfc] rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Personal Detail</h2>
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-[13px] font-bold text-gray-800 mb-0.5">Full Name</div>
              <div className="text-[13px] text-gray-500">Student</div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-gray-800 mb-0.5">Student ID</div>
              <div className="text-[13px] text-gray-500">22101055</div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-gray-800 mb-0.5">National Student ID</div>
              <div className="text-[13px] text-gray-500">221010550321</div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-gray-800 mb-0.5">Gender</div>
              <div className="text-[13px] text-gray-500">Male</div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-gray-800 mb-0.5">Date of Birth</div>
              <div className="text-[13px] text-gray-500">March 2nd 2001 (17 Years Old)</div>
            </div>
          </div>
        </div>

        <div className="bg-[#e4ebfc] rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Academic Information</h2>
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-[13px] font-bold text-gray-800 mb-0.5">Grade / Class</div>
              <div className="text-[13px] text-gray-500">Grade 10 - A</div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-gray-800 mb-0.5">Phase</div>
              <div className="text-[13px] text-gray-500">Phase A</div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-gray-800 mb-0.5">Academic Year</div>
              <div className="text-[13px] text-gray-500">S1, 2024/2025</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-100 mb-8"></div>

      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-[13px] font-bold text-gray-800 mb-1">Email</div>
            <div className="text-[13px] text-blue-500 font-medium">alexandra.johnson@student.school.edu</div>
          </div>
          <div>
            <div className="text-[13px] font-bold text-gray-800 mb-1">Phone Number</div>
            <div className="text-[13px] text-blue-500 font-medium">+62 812-3456-7890</div>
          </div>
          <div>
            <div className="text-[13px] font-bold text-gray-800 mb-1">Address</div>
            <div className="text-[13px] text-blue-500 font-medium leading-relaxed">
              Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMedicalTab = () => (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <h2 className="text-[15px] font-bold text-gray-800 mb-4">Vaccination Records</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {["COVID-19 (Booster)", "Hepatitis B", "MMR", "Tetanus"].map((vac) => (
            <div key={vac} className="rounded-lg overflow-hidden border border-gray-100 flex flex-col shadow-sm">
              <div className="bg-[#48a156] px-4 py-2.5 text-white font-medium text-[13px]">{vac}</div>
              <div className="bg-white p-6 flex justify-center items-center">
                <div className="w-10 h-10 rounded-full bg-[#48a156] flex items-center justify-center text-white">
                  <CheckIcon className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 flex flex-col gap-6">
        <div className="bg-[#fffdf0] border border-[#fde68a] rounded-lg p-5 flex gap-3">
          <div className="text-[#d97706] mt-0.5">
            <InfoIcon className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[13px] font-bold text-[#b45309]">Confidential Medical Information</div>
            <div className="text-[13px] font-medium text-[#d97706]">
              This information is securely stored and only visible to authorized personnel (student, guardians, medical staff, and authorized administrators).
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#e4ebfc] rounded-xl p-6">
            <h2 className="text-[17px] font-bold text-gray-800 mb-6">Basic Medical Information</h2>
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-[13px] font-bold text-gray-800 mb-0.5">Blood Type</div>
                <div className="text-[13px] text-gray-600">A+</div>
              </div>
              <div>
                <div className="text-[13px] font-bold text-gray-800 mb-0.5">Allergy</div>
                <div className="text-[13px] text-gray-600">Peanuts, Shellfish, Penicillin</div>
              </div>
              <div>
                <div className="text-[13px] font-bold text-gray-800 mb-0.5">Medical Condition</div>
                <div className="text-[13px] text-gray-600">Asthma (Mild)</div>
              </div>
              <div>
                <div className="text-[13px] font-bold text-gray-800 mb-0.5">Current Medication</div>
                <div className="text-[13px] text-gray-600">Albuterol Inhaler (as needed)</div>
              </div>
            </div>
          </div>

          <div className="bg-[#e4ebfc] rounded-xl p-6">
            <h2 className="text-[17px] font-bold text-gray-800 mb-6">Emergency Contact</h2>
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-[13px] font-bold text-gray-800 mb-0.5">Contact Name</div>
                <div className="text-[13px] text-gray-600">Sarah Johnson</div>
              </div>
              <div>
                <div className="text-[13px] font-bold text-gray-800 mb-0.5">Relationship</div>
                <div className="text-[13px] text-gray-600">Mother</div>
              </div>
              <div>
                <div className="text-[13px] font-bold text-gray-800 mb-0.5">Phone Number</div>
                <div className="text-[13px] text-gray-600">+62 811-2345-6789</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg p-5 flex gap-3">
          <div className="text-red-500 mt-0.5">
            <AlertIcon className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="text-[13px] font-bold text-red-500">Special Health Note</div>
            <div className="bg-white border border-[#fecaca] text-red-600 text-[13px] font-medium p-3 rounded">
              Carries inhaler for asthma. Requires EpiPen for severe allergic reactions. Avoid peanut products.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEducationTab = () => (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <h2 className="text-[15px] font-bold text-gray-800 mb-4">Extracurricular Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "Student Council - Vice President",
            "Debate Club - Member",
            "Volleyball Team - Captain",
          ].map((activity) => (
            <div key={activity} className="rounded-lg overflow-hidden border border-gray-100 flex flex-col shadow-sm">
              <div className="bg-[#4a6cf7] px-4 py-2.5 text-white font-medium text-[13px]">{activity}</div>
              <div className="bg-white px-5 py-6 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-800">98%</span>
                <span className="text-[13px] font-medium text-gray-500">Attendance</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#e4ebfc] rounded-xl p-6">
            <h2 className="text-[17px] font-bold text-gray-800 mb-6">Enrollment Information</h2>
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-[13px] font-bold text-gray-800 mb-0.5">Previous School</div>
                <div className="text-[13px] text-gray-500">Sunrise Elementary School</div>
              </div>
              <div>
                <div className="text-[13px] font-bold text-gray-800 mb-0.5">Enrollment Date</div>
                <div className="text-[13px] text-gray-500">July 2nd 2020</div>
              </div>
              <div>
                <div className="text-[13px] font-bold text-gray-800 mb-0.5">Current GPA</div>
                <div className="text-[13px] text-gray-500">3.85</div>
              </div>
            </div>
          </div>

          <div className="bg-[#e4ebfc] rounded-xl p-6">
            <h2 className="text-[17px] font-bold text-gray-800 mb-6">Academic Achievement</h2>
            <div className="flex flex-col gap-3">
              {[
                "Honor Roll - Semester 1 & 2 (2023)",
                "Mathematics Olympiad - Silver Medal (2023)",
                "Science Fair Winner - Regional Level (2024)",
              ].map((achievement, idx) => (
                <div key={idx} className="bg-white px-4 py-3 rounded text-[12px] font-bold text-gray-800 shadow-sm">
                  {achievement}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGuardianTab = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 flex flex-col gap-6">
      {GUARDIANS.map((guardian, idx) => (
        <div key={guardian.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 flex items-center gap-6">
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
              <img src={guardian.image} alt={guardian.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h3 className="text-[17px] font-bold text-gray-800">{guardian.name}</h3>
                {guardian.isPrimary && (
                  <span className="bg-[#4a6cf7] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Primary
                  </span>
                )}
              </div>
              <div className="text-[12px] font-bold text-gray-600">{guardian.relation}</div>
              <div className="text-[12px] text-gray-500">{guardian.job}</div>
            </div>
          </div>
          <div className="w-full h-px bg-gray-100"></div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <div className="text-[13px] font-bold text-gray-800 mb-1">Contact Number</div>
              <div className="text-[13px] text-blue-500 font-medium">{guardian.phone}</div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-gray-800 mb-1">E-mail</div>
              <div className="text-[13px] text-blue-500 font-medium">{guardian.email}</div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-gray-800 mb-1">Financial Responsibility</div>
              <div className="text-[13px] text-blue-500 font-medium">{guardian.financial}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSecurityTab = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 flex flex-col gap-8">
      <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg p-5">
        <div className="text-[13px] font-bold text-[#166534] mb-1">Account Security Status: Excellent</div>
        <div className="text-[13px] font-medium text-[#166534]">Your account is well protected with 2FA enabled</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#e4ebfc] rounded-xl p-6 flex flex-col items-start">
          <h2 className="text-[17px] font-bold text-gray-800 mb-4">Password & Email</h2>
          <div className="mb-4">
            <div className="text-[13px] font-bold text-gray-800 mb-0.5">E-mail</div>
            <div className="text-[13px] text-gray-600">alexandra.johnson@student.school.edu</div>
          </div>
          <div className="mb-6">
            <div className="text-[13px] font-bold text-gray-800 mb-0.5">Password</div>
            <div className="text-[13px] text-gray-600">Last changed: March 2nd 2025</div>
          </div>
          <button className="bg-[#4a6cf7] text-white text-[13px] font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Change Password
          </button>
        </div>

        <div className="bg-[#e4ebfc] rounded-xl p-6 flex flex-col items-start">
          <h2 className="text-[17px] font-bold text-gray-800 mb-4">Two-Factor Authentication</h2>
          <div className="mb-4">
            <div className="text-[13px] font-bold text-gray-800 mb-0.5">2FA is Enabled</div>
            <div className="text-[13px] text-gray-600">Add an extra layer of security to your account</div>
          </div>
          <button className="bg-[#4a6cf7] text-white text-[13px] font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition mt-auto">
            Disable 2FA
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4 text-[#4a6cf7]">
          <InfoIcon className="w-5 h-5" />
          <h2 className="text-[15px] font-bold text-gray-800">Trusted Device (2)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((idx) => (
            <div key={idx} className="bg-white border border-[#c7d2fe] rounded-lg p-5 relative shadow-sm">
              <button className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition">
                <TrashIcon className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  <MonitorIcon className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-blue-500">Personal Laptop</div>
                  <div className="text-[12px] font-medium text-blue-500">Chrome on Windows 11</div>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-[12px] text-gray-600">
                <div>Last used: Feb 17, 2024, 08:30 AM</div>
                <div>Added: January 5, 2024</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-[17px] font-bold text-gray-800 mb-4">Recent Login Activity</h2>
        <div className="flex flex-col gap-4">
          {RECENT_LOGINS.map((login) => (
            <div key={login.id} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 flex-shrink-0">
                  <MonitorIcon className="w-7 h-7" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="text-[13px] font-bold text-blue-500">{login.device}</div>
                  <div className="text-[12px] text-gray-500">{login.location}</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <div className="text-[12px] text-gray-500 font-medium">{login.date}</div>
                <div
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded text-white ${login.status === "Success" ? "bg-[#48a156]" : "bg-red-500"
                    }`}
                >
                  {login.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="flex flex-col gap-6">
      <div className="bg-[#e4ebfc] rounded-xl p-6">
        <h2 className="text-[17px] font-bold text-gray-800 mb-6">Appearance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button className="bg-white border-2 border-blue-500 rounded-lg p-6 flex flex-col items-center justify-center gap-3 transition hover:shadow-sm">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 mb-1">
              <SunIcon className="w-7 h-7" />
            </div>
            <div className="flex flex-col items-center">
              <div className="text-[14px] font-bold text-blue-500 mb-0.5">Light Mode</div>
              <div className="text-[12px] text-gray-500">Classic bright theme</div>
            </div>
          </button>

          <button className="bg-white border-2 border-transparent rounded-lg p-6 flex flex-col items-center justify-center gap-3 transition hover:shadow-sm">
            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-700 mb-1">
              <MoonIcon className="w-7 h-7" />
            </div>
            <div className="flex flex-col items-center">
              <div className="text-[14px] font-bold text-gray-800 mb-0.5">Dark Mode</div>
              <div className="text-[12px] text-gray-500">Easy on the eye</div>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-[#e4ebfc] rounded-xl p-6">
        <h2 className="text-[17px] font-bold text-gray-800 mb-6">Language</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button className="bg-white border-2 border-blue-500 rounded-lg p-4 flex items-center gap-4 transition hover:shadow-sm text-left">
            <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 text-xl font-bold">
              US
            </div>
            <div className="flex flex-col">
              <div className="text-[15px] font-bold text-blue-500 mb-0.5">English</div>
              <div className="text-[12px] text-gray-500">English</div>
            </div>
          </button>

          <button className="bg-white border-2 border-transparent rounded-lg p-4 flex items-center gap-4 transition hover:shadow-sm text-left">
            <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-gray-800 text-xl font-bold">
              ID
            </div>
            <div className="flex flex-col">
              <div className="text-[15px] font-bold text-gray-800 mb-0.5">Indonesian</div>
              <div className="text-[12px] text-gray-500">Bahasa Indonesia</div>
            </div>
          </button>

          <button className="bg-white border-2 border-transparent rounded-lg p-4 flex items-center gap-4 transition hover:shadow-sm text-left">
            <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-gray-800 text-xl font-bold">
              CH
            </div>
            <div className="flex flex-col">
              <div className="text-[15px] font-bold text-gray-800 mb-0.5">Chinese</div>
              <div className="text-[12px] text-gray-500">中文</div>
            </div>
          </button>

          <button className="bg-white border-2 border-transparent rounded-lg p-4 flex items-center gap-4 transition hover:shadow-sm text-left">
            <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-gray-800 text-xl font-bold">
              ES
            </div>
            <div className="flex flex-col">
              <div className="text-[15px] font-bold text-gray-800 mb-0.5">Spanish</div>
              <div className="text-[12px] text-gray-500">Español</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen bg-slate-50 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Account</h1>
          <div className="flex gap-4 border-b border-gray-200 overflow-x-auto pb-[1px]">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-[14px] font-medium transition whitespace-nowrap ${activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {tab}
              </button>
            ))}
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

      {/* Content Rendering */}
      <div>
        {activeTab === "Profile" && renderProfileTab()}
        {activeTab === "Medical" && renderMedicalTab()}
        {activeTab === "Education" && renderEducationTab()}
        {activeTab === "Guardian" && renderGuardianTab()}
        {activeTab === "Security" && renderSecurityTab()}
        {activeTab === "Preferences" && renderPreferencesTab()}
      </div>
    </div>
  );
}
