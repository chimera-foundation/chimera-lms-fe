"use client";
import { useEffect, useState } from "react";
import {
  getDashboard,
  getDashboardAnnouncements,
  getDashboardUpcomingDeadlines,
} from "../redux/dashboard/dashboard-slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Announcements from "./components/announcements";
import Assignments from "./components/assignments";
import { Calendar } from "./components/calendar";
import EventsSection from "./components/events";
import Exams from "./components/exams";
import ScheduleSection from "./components/schedule";
import { getAllAnnouncements } from "../redux/announcement/announcement-slice";
import { getAllEvents } from "../redux/event/event-slice";
import { getCalendar } from "../redux/calendar/calendar-slice";
import { getCurrentUser } from "../redux/messaging/messaging-slice";

export default function DashboardPage() {
  const { currentUser } = useAppSelector((x) => x.messaging);
  const dispatch = useAppDispatch();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getMonthDateRange = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const startDate = new Date(Date.UTC(year, month, 1, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59));

    return {
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    };
  };

  useEffect(() => {
    const { start_date, end_date } = getMonthDateRange(currentMonth);

    // dispatch(getDashboard());
    // dispatch(getDashboardAnnouncements());
    // dispatch(getDashboardUpcomingDeadlines());
    // dispatch(
    //   getAllSchedules({
    //     itemize: true,
    //   }),
    // );
    dispatch(getAllAnnouncements({ start_date, end_date }));
    dispatch(getAllEvents({ start_date, end_date }));
    dispatch(getCurrentUser());
  }, []);

  return (
    <div className="p-4 h-screen overflow-scroll bg-chimera-blue-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Hello Student, welcome back!</p>
        </div>
        <div className="flex text-left flex-col">
          <p className="font-semibold text-gray-800">{currentUser?.first_name + " " + currentUser?.last_name}</p>
          <p className="text-sm text-gray-500 capitalize">{currentUser?.roles}</p>
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
          <ScheduleSection />
        </div>
        <div className="h-118 bg-white shadow-md rounded-md p-4 overflow-hidden">
          <Announcements />
        </div>
        <div className="h-120 bg-white shadow-md rounded-md p-4 overflow-hidden">
          <Assignments />
        </div>
        <div className="h-120 bg-white shadow-md rounded-md p-4 overflow-hidden">
          <Exams />
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
          <ScheduleSection />
        </div>
        <div className="col-span-7 col-start-4 row-start-2 bg-white shadow-md rounded-md p-4 overflow-hidden">
          <Announcements />
        </div>
        <div className="col-span-5 row-start-3 bg-white shadow-md rounded-md p-4">
          <Assignments />
        </div>
        <div className="col-span-5 col-start-6 row-start-3 bg-white shadow-md rounded-md p-4">
          <Exams />
        </div>
      </div>
    </div>
  );
}
