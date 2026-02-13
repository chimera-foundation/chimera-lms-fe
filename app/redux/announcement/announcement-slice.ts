import {
  AnnouncementItem,
  getAllAnnouncementsService,
  GetAnnouncementsResponse,
} from "@/app/services/announcement-services";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AnnouncementState {
  announcement: AnnouncementItem[];
  loading: boolean;
  error: string | null;
}

const initialState: AnnouncementState = {
  announcement: [],
  loading: false,
  error: null,
};

export const getAllAnnouncements = createAsyncThunk(
  "getAllAnnouncements/GET",
  async (props: { start_date?: string; end_date?: string }) => {
    const response = await getAllAnnouncementsService(props);
    return response;
  },
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
          state.announcement = action.payload.data;
        },
      )
      .addCase(getAllAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = announcementSlice.actions;
export default announcementSlice.reducer;
