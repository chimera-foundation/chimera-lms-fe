import {
  EventItem,
  getAllEventsService,
  GetEventsResponse,
  HolidayItem,
} from "@/app/services/event-services";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface EventState {
  events: EventItem[];
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
};

export const getAllEvents = createAsyncThunk(
  "getAllEvents/GET",
  async (props: { start_date?: string; end_date?: string }) => {
    const response = await getAllEventsService(props);
    return response;
  },
);

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllEvents.fulfilled,
        (state, action: PayloadAction<GetEventsResponse>) => {
          state.loading = false;
          state.events = action.payload.data;
        },
      )
      .addCase(getAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = eventSlice.actions;
export default eventSlice.reducer;
