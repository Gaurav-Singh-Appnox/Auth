import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slicer/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
