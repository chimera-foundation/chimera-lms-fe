import { AssignmentsItem } from "../redux/dashboard/dashboard-slice";
import { AnnouncementItem } from "./announcement-services";

export interface DashboardItem {
  user_id: string;
  username: string;
  total_courses_enrolled: number;
  courses_in_progress: number;
  courses_completed: number;
  overall_progress: number;
  enrolled_courses: any[];
  upcoming_deadlines: any[];
  recent_announcements_count: number;
  unread_notifications_count: number;
}

export interface DashboardAnnouncementItem {
  id: string;
  title: string;
  content: string;
  published_at: string;
  priority: string;
  image_url: string;
}

export interface DashboardExamItem {
  id: string;
  title: string;
  subject: string;
  due_date: string;
  status: string;
  attachment_type: string;
}

export interface DashboardDeadlinesItem {
  id: string;
  title: string;
  due_date: string;
  type: string;
  course_title: string;
}

export interface DailyScheduleItem {
  id: string;
  title: string;
  type: string;
  start_time: string;
  end_time: string;
  location: string;
  description: string;
  course_title: string;
}

export interface DailyScheduleResponse {
  date: string;
  items: DailyScheduleItem[] | [];
}

export interface MonthlyEventsResponse {
  month: string;
  dates_with_events: string[];
}

export const getDashboardService = async (props: {
  token: string;
}): Promise<DashboardItem> => {
  const { token } = props;

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: "",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`/api/dashboard/student`, {
    method: "GET",
    headers,
  });

  const data = await response.json();

  return data;
};

export const getDashboardAssignmentsService = async (props: {
  token: string;
}): Promise<AssignmentsItem[]> => {
  const { token } = props;

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: "",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`/api/dashboard/assignments`, {
    method: "GET",
    headers,
  });

  const data = await response.json();

  return data;
};

export const getDashboardAnnouncementsService = async (props: {
  token: string;
}): Promise<DashboardAnnouncementItem[]> => {
  const { token } = props;

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: "",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`/api/dashboard/announcements`, {
    method: "GET",
    headers,
  });

  const data = await response.json();

  return data;
};

export const getDashboardExamsService = async (props: {
  token: string;
}): Promise<DashboardExamItem[]> => {
  const { token } = props;

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: "",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`/api/dashboard/exams`, {
    method: "GET",
    headers,
  });

  const data = await response.json();

  return data;
};

export const getDashboardUpcomingDeadlinesService = async (props: {
  token: string;
}): Promise<DashboardDeadlinesItem[]> => {
  const { token } = props;

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: "",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`/api/dashboard/deadline`, {
    method: "GET",
    headers,
  });

  const data = await response.json();

  return data;
};

export const getDashboardDailyScheduleService = async (props: {
  token: string;
  date: string;
}): Promise<DailyScheduleResponse> => {
  const { token, date } = props;

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: "",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`/api/dashboard/schedule/daily?date=${date}`, {
    method: "GET",
    headers,
  });

  const data = await response.json();

  return data;
};

export const getDashboardMonthlyEventsService = async (props: {
  token: string;
  date: string;
}): Promise<MonthlyEventsResponse> => {
  const { token, date } = props;

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: "",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`/api/dashboard/schedule/monthly?date=${date}`, {
    method: "GET",
    headers,
  });

  const data = await response.json();

  return data;
};
