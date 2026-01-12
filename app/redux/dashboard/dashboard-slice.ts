import {
  Assignments,
  AssignmentsItem,
  DailyScheduleItem,
  DailyScheduleResponse,
  DashboardAnnouncementItem,
  DashboardDeadlinesItem,
  DashboardExamItem,
  DashboardItem,
  Exams,
  getDashboardAnnouncementsService,
  getDashboardAssignmentsService,
  getDashboardDailyScheduleService,
  getDashboardExamsService,
  getDashboardMonthlyEventsService,
  getDashboardService,
  getDashboardUpcomingDeadlinesService,
  MonthlyEventsResponse,
} from "@/app/services/dashboard-services";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
  dashboard: DashboardItem | null;
  assignments: Assignments | null;
  announcements: DashboardAnnouncementItem[] | [];
  exam: Exams | null;
  upcoming_deadlines: DashboardDeadlinesItem[] | [];
  daily_schedule: DailyScheduleItem[] | [];
  loading: boolean;
  loadingDailySchedule: boolean;
  monthlyEvents: string[];
}

const initialState: DashboardState = {
  dashboard: null,
  assignments: null,
  announcements: [],
  exam: null,
  upcoming_deadlines: [],
  daily_schedule: [],
  loading: false,
  loadingDailySchedule: false,
  monthlyEvents: [],
};

export const getDashboard = createAsyncThunk("getDashboard/GET", async () => {
  const response = await getDashboardService();
  return response;
});

export const getDashboardAssignments = createAsyncThunk(
  "getDashboardAssignments/GET",
  async (props: { start_date?: string; end_date?: string }) => {
    const response = await getDashboardAssignmentsService(props);
    return response;
  }
);

export const getDashboardAnnouncements = createAsyncThunk(
  "getDashboardAnnouncements/GET",
  async () => {
    const response = await getDashboardAnnouncementsService();
    return response;
  }
);

export const getDashboardExams = createAsyncThunk(
  "getDashboardExams/GET",
  async (props: { start_date?: string; end_date?: string }) => {
    const response = await getDashboardExamsService(props);
    return response;
  }
);

export const getDashboardUpcomingDeadlines = createAsyncThunk(
  "getDashboardUpcomingDeadlines/GET",
  async () => {
    const response = await getDashboardUpcomingDeadlinesService();
    return response;
  }
);

export const getDashboardDailySchedule = createAsyncThunk(
  "getDashboardDailySchedule/GET",
  async (props: { date: string }) => {
    const response = await getDashboardDailyScheduleService(props);
    return response;
  }
);

export const getDashboardMonthlyEvents = createAsyncThunk(
  "getDashboardMonthlyEvents/GET",
  async (props: { start_date: string; end_date: string }) => {
    const response = await getDashboardMonthlyEventsService(props);
    return response;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getDashboard.fulfilled,
        (state, action: PayloadAction<DashboardItem>) => {
          state.loading = false;
          state.dashboard = action.payload;
        }
      )
      .addCase(getDashboard.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getDashboardAssignments.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getDashboardAssignments.fulfilled,
        (state, action: PayloadAction<Assignments>) => {
          state.loading = false;
          state.assignments = action.payload;
        }
      )
      .addCase(getDashboardAssignments.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getDashboardAnnouncements.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getDashboardAnnouncements.fulfilled,
        (state, action: PayloadAction<DashboardAnnouncementItem[]>) => {
          state.loading = false;
          state.announcements = action.payload;
        }
      )
      .addCase(getDashboardAnnouncements.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getDashboardExams.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getDashboardExams.fulfilled,
        (state, action: PayloadAction<Exams>) => {
          state.loading = false;
          state.exam = action.payload;
        }
      )
      .addCase(getDashboardExams.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getDashboardUpcomingDeadlines.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getDashboardUpcomingDeadlines.fulfilled,
        (state, action: PayloadAction<DashboardDeadlinesItem[]>) => {
          state.loading = false;
          state.upcoming_deadlines = action.payload;
        }
      )
      .addCase(getDashboardUpcomingDeadlines.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getDashboardDailySchedule.pending, (state) => {
        state.loadingDailySchedule = true;
      })
      .addCase(
        getDashboardDailySchedule.fulfilled,
        (state, action: PayloadAction<DailyScheduleResponse>) => {
          state.loadingDailySchedule = false;
          state.daily_schedule = action.payload.items;
        }
      )
      .addCase(getDashboardDailySchedule.rejected, (state, action) => {
        state.loadingDailySchedule = false;
      })
      .addCase(getDashboardMonthlyEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getDashboardMonthlyEvents.fulfilled,
        (state, action: PayloadAction<MonthlyEventsResponse>) => {
          state.loading = false;
          state.monthlyEvents = action.payload.dates_with_events;
        }
      )
      .addCase(getDashboardMonthlyEvents.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default dashboardSlice.reducer;
