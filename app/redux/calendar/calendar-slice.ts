import { EventItem, GetEventsResponse } from "@/app/models/event";
import { getCalendarService } from "@/app/services/calendar-services";
import { getAllEventsService } from "@/app/services/event-services";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface CalendarState {
  calendar: EventItem[];
  selectedDate: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: CalendarState = {
  calendar: [],
  selectedDate: new Date().toISOString(),
  loading: false,
  error: null,
};

export const getCalendar = createAsyncThunk(
  "getCalendar/GET",
  async (props: { start_date?: string; end_date?: string }) => {
    const response = await getCalendarService(props);
    return response;
  },
);

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCalendar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCalendar.fulfilled,
        (state, action: PayloadAction<GetEventsResponse>) => {
          state.loading = false;
          state.calendar = action.payload.data;
        },
      )
      .addCase(getCalendar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setSelectedDate } = calendarSlice.actions;
export default calendarSlice.reducer;
