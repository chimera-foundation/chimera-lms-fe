import {
  AssesmentState,
  getAllAssessmentsAssignmentService,
  getAllAssessmentsExamService,
  GetAssessmentsResponse,
} from "@/app/services/assessments-service";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const initialState: AssesmentState = {
  assessmentExam: null,
  assessmentAssignment: null,
  loading: false,
  error: null,
};

export const getAllAssessmentsExam = createAsyncThunk(
  "getAllAssessmentsExam/GET",
  async (props: { start_date?: string; end_date?: string; type?: string }) => {
    const response = await getAllAssessmentsExamService(props);
    return response;
  },
);

export const getAllAssessmentsAssignment = createAsyncThunk(
  "getAllAssessmentsAssignment/GET",
  async (props: { start_date?: string; end_date?: string; type?: string }) => {
    const response = await getAllAssessmentsAssignmentService(props);
    return response;
  },
);

const assessmentSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAssessmentsAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllAssessmentsAssignment.fulfilled,
        (state, action: PayloadAction<GetAssessmentsResponse>) => {
          state.loading = false;
          state.assessmentAssignment = action.payload.data;
        },
      )
      .addCase(getAllAssessmentsAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllAssessmentsExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllAssessmentsExam.fulfilled,
        (state, action: PayloadAction<GetAssessmentsResponse>) => {
          state.loading = false;
          state.assessmentExam = action.payload.data;
        },
      )
      .addCase(getAllAssessmentsExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = assessmentSlice.actions;
export default assessmentSlice.reducer;
