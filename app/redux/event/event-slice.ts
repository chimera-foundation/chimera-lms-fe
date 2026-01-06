import {
  EventItem,
  getAllEventsService,
  GetEventsResponse,
} from "@/app/services/event-services";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface EventState {
  events: EventItem[];
  total: number;
  page: number;
  per_page: number;
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  total: 0,
  page: 0,
  per_page: 0,
  loading: false,
  error: null,
};

export const getAllEvents = createAsyncThunk(
  "getAllEvents/GET",
  async (props: { token: string }) => {
    const response = await getAllEventsService(props);
    return response;
  }
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
          state.events = action.payload.items;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.per_page = action.payload.per_page;
        }
      )
      .addCase(getAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = eventSlice.actions;
export default eventSlice.reducer;
