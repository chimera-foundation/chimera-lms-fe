import {
  AnnouncementItem,
  getAllAnnouncementsService,
  GetAnnouncementsResponse,
} from "@/app/services/announcement-services";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AnnouncementState {
  announcement: AnnouncementItem[];
  total: number;
  page: number;
  per_page: number;
  loading: boolean;
  error: string | null;
}

const initialState: AnnouncementState = {
  announcement: [],
  total: 0,
  page: 0,
  per_page: 0,
  loading: false,
  error: null,
};

export const getAllAnnouncements = createAsyncThunk(
  "getAllAnnouncements/GET",
  async (props: { token: string }) => {
    const response = await getAllAnnouncementsService(props);
    return response;
  }
);

const announcementSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllAnnouncements.fulfilled,
        (state, action: PayloadAction<GetAnnouncementsResponse>) => {
          state.loading = false;
          state.announcement = action.payload.items;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.per_page = action.payload.per_page;
        }
      )
      .addCase(getAllAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = announcementSlice.actions;
export default announcementSlice.reducer;
