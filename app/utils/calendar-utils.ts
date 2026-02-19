import { EventItem } from "@/app/models/event";

const getLocalDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const groupEventsByDate = (
  events: EventItem[],
): Map<string, EventItem[]> => {
  const grouped = new Map<string, EventItem[]>();

  if (!events || !Array.isArray(events)) {
    return grouped;
  }

  events.forEach((event) => {
    const startDate = new Date(event.StartAt);
    const dateKey = getLocalDateKey(startDate);

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

  for (let i = 0; i < 35; i++) {
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
