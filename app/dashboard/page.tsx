"use client";
import { useRouter } from "next/navigation";
import { logout } from "../redux/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Announcements from "./components/announcements";
import { Calendar } from "./components/calendar";
import EventsSection from "./components/events";

export default function DashboardPage() {
  const { username, accessToken } = useAppSelector((x) => x.user);

  return (
    <div className="p-4 h-screen overflow-scroll bg-slate-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Hello Student, welcome back!</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">{username}</p>
          <p className="text-sm text-gray-500">Student</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:hidden">
        <div className="h-86 shadow-md p-2 bg-white rounded-md">
          <Calendar />
        </div>
        <div className="h-86 bg-white shadow-md rounded-md p-4">
          <EventsSection title="Events" />
        </div>
        <div className="h-118 bg-white shadow-md rounded-md p-4">
          <EventsSection title="Schedule" />
        </div>
        <div className="h-118 bg-white shadow-md rounded-md p-4 overflow-hidden">
          <Announcements />
        </div>
        <div className="h-86 bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-semibold">Assignment TODO</h3>
        </div>
        <div className="h-86 bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-semibold">Exam TODO</h3>
        </div>
      </div>

      <div className="hidden lg:grid lg:grid-cols-10 lg:grid-rows-[344px_472px_344px] gap-4">
        <div className="col-span-5 shadow-md bg-white rounded-md">
          <Calendar />
        </div>
        <div className="col-span-5 col-start-6 bg-white shadow-md rounded-md p-4">
          <EventsSection title="Events" />
        </div>
        <div className="col-span-3 row-start-2 bg-white shadow-md rounded-md p-4">
          <EventsSection title="Schedule" />
        </div>
        <div className="col-span-7 col-start-4 row-start-2 bg-white shadow-md rounded-md p-4 overflow-hidden">
          <Announcements />
        </div>
        <div className="col-span-5 row-start-3 bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-semibold">Assignment TODO</h3>
        </div>
        <div className="col-span-5 col-start-6 row-start-3 bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-lg font-semibold">Exam TODO</h3>
        </div>
      </div>
    </div>
  );
}
