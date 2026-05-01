import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LearningCourse, LearningResource, CourseCurriculum } from "@/app/models/learning";
import {
  getLearningCoursesService,
  getLearningResourcesService,
  getCourseCurriculumService,
  completeModuleService,
} from "@/app/services/learning-services";

interface LearningState {
  courses: LearningCourse[];
  resources: LearningResource[];
  curriculum: CourseCurriculum | null;
  resourceTotal: number;
  loading: boolean;
  error: string | null;
}

const initialState: LearningState = {
  courses: [],
  resources: [],
  curriculum: null,
  resourceTotal: 0,
  loading: false,
  error: null,
};

export const getLearningCourses = createAsyncThunk(
  "learning/getCourses",
  async () => {
    const response = await getLearningCoursesService();
    return response;
  }
);

export const getLearningResources = createAsyncThunk(
  "learning/getResources",
  async (props: { page?: number; limit?: number }) => {
    const response = await getLearningResourcesService(props);
    return response;
  }
);

export const getCourseCurriculum = createAsyncThunk(
  "learning/getCurriculum",
  async (courseId: string) => {
    const response = await getCourseCurriculumService(courseId);
    return response;
  }
);

export const completeModule = createAsyncThunk(
  "learning/completeModule",
  async (moduleId: string) => {
    const response = await completeModuleService(moduleId);
    return response;
  }
);

const learningSlice = createSlice({
  name: "learning",
  initialState,
  reducers: {
    clearLearningError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Courses
    builder.addCase(getLearningCourses.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getLearningCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.courses = action.payload.data.data;
    });
    builder.addCase(getLearningCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch courses";
    });

    // Resources
    builder.addCase(getLearningResources.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getLearningResources.fulfilled, (state, action) => {
      state.loading = false;
      state.resources = action.payload.data.data;
      state.resourceTotal = action.payload.data.meta.total;
    });
    builder.addCase(getLearningResources.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch resources";
    });

    // Curriculum
    builder.addCase(getCourseCurriculum.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCourseCurriculum.fulfilled, (state, action) => {
      state.loading = false;
      state.curriculum = action.payload.data.data;
    });
    builder.addCase(getCourseCurriculum.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch curriculum";
    });

    // Complete Module
    builder.addCase(completeModule.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(completeModule.fulfilled, (state, action) => {
      state.loading = false;
      // You might want to refresh curriculum here or handle optimism
    });
    builder.addCase(completeModule.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to complete module";
    });
  },
});

export const { clearLearningError } = learningSlice.actions;
export default learningSlice.reducer;
