import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for login
export const login = createAsyncThunk("auth/login", async (userData) => {
  const response = await axios.post("/login", userData);
  return response.data;
});

// Async thunk for registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData) => {
    const response = await axios.post("auth/register", userData);
    console.log("response", response);
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      firstName: null,
      lastName: null,
      emial: null,
      password: null,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
