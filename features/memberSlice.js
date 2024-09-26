import { createSlice } from "@reduxjs/toolkit";

const memberSlice = createSlice({
  name: "members",
  initialState: {
    members: [],
  },
  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    clearMembers: (state) => {
      state.members = [];
    },
  },
});

export const { setMembers, clearMembers } = memberSlice.actions;
export default memberSlice.reducer;
