import {
  getMeService,
  loginUserService,
  logoutUserService,
} from "@/app/services/auth-services";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserState {
  loading: boolean;
  error: string;
  isAuthenticated: boolean;
  username: string;
}

const initialState: UserState = {
  loading: false,
  error: "",
  isAuthenticated: false,
  username: "",
};

export const loginUser = createAsyncThunk(
  "loginUser/POST",
  async (props: { email: string; password: string }) => {
    const response = await loginUserService(props);
    return response;
  }
);

export const logoutUser = createAsyncThunk("logoutUser/POST", async () => {
  const response = await logoutUserService();
  return response;
});

export const hydrateSession = createAsyncThunk(
  "user/hydrate",
  async (_, { rejectWithValue }) => {
    try {
      return await getMeService();
    } catch {
      return rejectWithValue("Session expired");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUsers(state) {
      state.error = "";
      state.isAuthenticated = false;
      state.username = "";
    },
    logout(state) {
      state.isAuthenticated = false;
      state.error = "";
      state.username = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username;
        state.isAuthenticated = true;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.username = "";
        state.isAuthenticated = false;
        state.error = "";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.isAuthenticated = false;
      })
      .addCase(hydrateSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(hydrateSession.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username;
        state.isAuthenticated = true;
        state.error = "";
      })
      .addCase(hydrateSession.rejected, (state) => {
        state.loading = false;
        state.username = "";
        state.isAuthenticated = false;
      });
  },
});

export const { clearUsers, logout } = userSlice.actions;
export default userSlice.reducer;
