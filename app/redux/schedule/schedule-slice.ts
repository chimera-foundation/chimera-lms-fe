import {
  getAllSchedulesService,
  GetScheduleResponse,
} from "@/app/services/schedule-service";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface ScheduleItem {
  id: string;
  title: string;
  schedule_type: string;
  start_time: string;
  end_time: string;
  location: string;
  description: string;
  recurrence_rule: string;
  is_active: boolean;
}

interface ScheduleState {
  total: number;
  page: number;
  per_page: number;
  schedule: ScheduleItem[] | [];
  loading: boolean;
  error: string | null;
}

const initialState: ScheduleState = {
  total: 0,
  page: 0,
  per_page: 0,
  schedule: [],
  loading: false,
  error: null,
};

export const getAllSchedules = createAsyncThunk(
  "getAllSchedules/GET",
  async (
    props: { itemize?: boolean; page?: number; per_page?: number } = {}
  ) => {
    const response = await getAllSchedulesService(props);
    return response;
  }
);

const scheduleSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllSchedules.fulfilled,
        (state, action: PayloadAction<GetScheduleResponse>) => {
          state.loading = false;
          state.error = null;
          state.schedule = action.payload.items;
          state.page = action.payload.page;
          state.per_page = action.payload.per_page;
          state.total = action.payload.total;
        }
      )
      .addCase(getAllSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = scheduleSlice.actions;
export default scheduleSlice.reducer;
