import { EventItem, GetEventsResponse } from "@/app/models/event";
import { CourseItem, Subjects, TrendItem } from "@/app/models/grade";
import { getAllEventsService } from "@/app/services/event-services";
import {
  getCoursesService,
  getSubjectService,
  getTrendService,
} from "@/app/services/grade-services";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface GradeState {
  trend: TrendItem[];
  courses: CourseItem[];
  subjects: Subjects[];
  loading: boolean;
  error: string | null;
}

const initialState: GradeState = {
  courses: [],
  trend: [],
  subjects: [],
  loading: false,
  error: null,
};

export const getTrend = createAsyncThunk(
  "getTrend/GET",
  async (props: { filter?: string }) => {
    const response = await getTrendService(props);
    return response;
  },
);

export const getCourses = createAsyncThunk("getCourses/GET", async () => {
  const response = await getCoursesService();
  return response;
});

export const getSubject = createAsyncThunk(
  "getSubject/GET",
  async (props: { filter?: string }) => {
    const response = await getSubjectService(props);
    return response;
  },
);

const gradeSlice = createSlice({
  name: "gradeSlice",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTrend.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTrend.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.trend = action.payload.data;
    });
    builder.addCase(getTrend.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getCourses.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.courses = action.payload.data;
    });
    builder.addCase(getCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getSubject.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSubject.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.subjects = action.payload.data;
    });
    builder.addCase(getSubject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError } = gradeSlice.actions;
export default gradeSlice.reducer;
