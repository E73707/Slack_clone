import { createSlice } from "@reduxjs/toolkit";

const communitySlice = createSlice({
  name: "current_community",
  initialState: {
    community: null,
  },
  reducers: {
    setCommunity: (state, action) => {
      state.community = action.payload;
    },
    clearCommunity: (state) => {
      state.community = null;
    },
  },
});

export const { setCommunity, clearCommunity } = communitySlice.actions;

export default communitySlice.reducer;
