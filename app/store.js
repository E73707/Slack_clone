import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice"; // Adjust path as necessary

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
