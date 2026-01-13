import { ScheduleItem } from "@/app/redux/schedule/schedule-slice";

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: string;
  location?: string;
  description?: string;
}

const getLocalDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const mapScheduleToCalendarEvent = (
  schedule: ScheduleItem
): CalendarEvent => {
  const startDate = new Date(schedule.start_time);
  const endDate = new Date(schedule.end_time);

  return {
    id: schedule.id,
    title: schedule.title,
    date: startDate,
    startTime: startDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    endTime: endDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    type: schedule.schedule_type,
    location: schedule.location,
    description: schedule.description,
  };
};

export const groupEventsByDate = (
  schedules: ScheduleItem[]
): Map<string, CalendarEvent[]> => {
  const grouped = new Map<string, CalendarEvent[]>();

  schedules.forEach((schedule) => {
    if (!schedule.is_active) return;

    const event = mapScheduleToCalendarEvent(schedule);
    const dateKey = getLocalDateKey(event.date);

    if (!grouped.has(dateKey)) {
      grouped.set(dateKey, []);
    }
    grouped.get(dateKey)!.push(event);
  });

  return grouped;
};

export const getCalendarDays = (year: number, month: number): Date[] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  const endDate = new Date(lastDay);

  const startDayOfWeek = firstDay.getDay();

  startDate.setDate(startDate.getDate() - startDayOfWeek);

  const days: Date[] = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < 42; i++) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isCurrentMonth = (date: Date, month: number): boolean => {
  return date.getMonth() === month;
};

export const getMonthName = (month: number): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month];
};

export const getDayName = (dayIndex: number): string => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[dayIndex];
};
