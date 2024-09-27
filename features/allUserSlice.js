import { createSlice } from "@reduxjs/toolkit";

const allUserSlice = createSlice({
  name: "allUser",
  initialState: {
    allUser: null,
  },
  reducers: {
    setAllUser: (state, action) => {
      state.allUser = action.payload;
    },
    clearAllUser: (state) => {
      state.allUser = null;
    },
  },
});

export const { setAllUser, clearAllUser } = allUserSlice.actions;
export default allUserSlice.reducer;
