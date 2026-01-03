import { loginUserService } from "@/app/services/auth-services";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserState {
  accessToken: string;
  tokenType: string;
  loading: boolean;
  error: string;
  isAuthenticated: boolean;
  username: string;
}

const initialState: UserState = {
  accessToken: "",
  tokenType: "",
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUsers(state) {
      state.accessToken = "";
      state.tokenType = "";
      state.error = "";
      state.isAuthenticated = false;
      if (typeof document !== "undefined") {
        document.cookie =
          "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    },
    logout(state) {
      state.accessToken = "";
      state.tokenType = "";
      state.isAuthenticated = false;
      state.error = "";
      if (typeof document !== "undefined") {
        document.cookie =
          "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
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
        state.accessToken = action.payload.access_token;
        state.tokenType = action.payload.token_type;
        state.username = action.payload.username;
        state.isAuthenticated = true;
        state.error = "";

        if (typeof document !== "undefined") {
          document.cookie = `access_token=${action.payload.access_token}; path=/; max-age=86400; SameSite=Lax`;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.isAuthenticated = false;
      });
  },
});

export const { clearUsers, logout } = userSlice.actions;
export default userSlice.reducer;
