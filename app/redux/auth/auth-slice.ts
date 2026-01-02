import { loginUserService } from "@/app/services/auth-services";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserState {
  data: string;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  data: "",
  loading: false,
  error: "",
};

export const loginUser = createAsyncThunk(
  "loginUser/POST",
  async (props: { username: string; password: string }) => {
    const response = await loginUserService(props);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUsers(state) {
      state.data = "";
      state.error = "";
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
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { clearUsers } = userSlice.actions;
export default userSlice.reducer;
