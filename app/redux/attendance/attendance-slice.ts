import {
  AttendanceSummary,
  AttendanceRecord,
  SubjectAttendance,
} from "@/app/models/attendance";
import {
  getAttendanceService,
  getSubjectAttendanceService,
} from "@/app/services/attendance-services";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AttendanceState {
  summary: AttendanceSummary | null;
  records: AttendanceRecord[];
  overviewRecords: AttendanceRecord[];
  subjectAttendance: SubjectAttendance[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: AttendanceState = {
  summary: null,
  records: [],
  overviewRecords: [],
  subjectAttendance: [],
  total: 0,
  loading: false,
  error: null,
};

export const getAttendance = createAsyncThunk(
  "getAttendance/GET",
  async (props: { filter?: string; limit?: number; offset?: number }) => {
    const response = await getAttendanceService(props);
    return response;
  },
);

export const getAttendanceOverview = createAsyncThunk(
  "getAttendanceOverview/GET",
  async (props: { filter?: string }) => {
    const response = await getAttendanceService({ ...props, limit: 500, offset: 0 });
    return response;
  },
);

export const getSubjectAttendance = createAsyncThunk(
  "getSubjectAttendance/GET",
  async (props: { filter?: string }) => {
    const response = await getSubjectAttendanceService(props);
    return response;
  },
);

const attendanceSlice = createSlice({
  name: "attendanceSlice",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAttendance.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAttendance.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.summary = action.payload.data.summary;
      state.records = action.payload.data.records;
      state.total = action.payload.data.total;
    });
    builder.addCase(getAttendance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getAttendanceOverview.fulfilled, (state, action) => {
      state.overviewRecords = action.payload.data.records;
      state.summary = action.payload.data.summary;
    });
    builder.addCase(getSubjectAttendance.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSubjectAttendance.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.subjectAttendance = action.payload.data;
    });
    builder.addCase(getSubjectAttendance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError } = attendanceSlice.actions;
export default attendanceSlice.reducer;
