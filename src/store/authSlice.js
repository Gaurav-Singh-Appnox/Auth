import { createSlice } from "@reduxjs/toolkit";
import mockUser from "../mockUser";

const initialState = {
  users: mockUser,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    getUser: (state, action) => {},
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
