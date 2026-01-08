import { AnnouncementItem } from "./announcement-services";

export interface AssignmentsItem {
  id: string;
  title: string;
  subject: string;
  due_date: string;
  status: string;
  attachment_type: string;
}

export interface StatusCountsItem {
  status: string;
  count: number;
}

export interface Assignments {
  items: AssignmentsItem[] | [];
  status_counts: StatusCountsItem[] | [];
}

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

export const getDashboardService = async (): Promise<DashboardItem> => {
  const response = await fetch(`/api/dashboard/student`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  const data = await response.json();

  return data;
};

export const getDashboardAssignmentsService =
  async (): Promise<Assignments> => {
    const response = await fetch(`/api/dashboard/assignments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });

    const data = await response.json();

    return data;
  };

export const getDashboardAnnouncementsService = async (): Promise<
  DashboardAnnouncementItem[]
> => {
  const response = await fetch(`/api/dashboard/announcements`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  const data = await response.json();

  return data;
};

export const getDashboardExamsService = async (): Promise<
  DashboardExamItem[]
> => {
  const response = await fetch(`/api/dashboard/exams`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  const data = await response.json();

  return data;
};

export const getDashboardUpcomingDeadlinesService = async (): Promise<
  DashboardDeadlinesItem[]
> => {
  const response = await fetch(`/api/dashboard/deadline`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  const data = await response.json();

  return data;
};

export const getDashboardDailyScheduleService = async (props: {
  date: string;
}): Promise<DailyScheduleResponse> => {
  const { date } = props;

  const response = await fetch(`/api/dashboard/schedule/daily?date=${date}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  const data = await response.json();

  return data;
};

export const getDashboardMonthlyEventsService = async (props: {
  date: string;
}): Promise<MonthlyEventsResponse> => {
  const { date } = props;

  const response = await fetch(`/api/dashboard/schedule/monthly?date=${date}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  const data = await response.json();

  return data;
};
