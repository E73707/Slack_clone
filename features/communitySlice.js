import { createSlice } from "@reduxjs/toolkit";

const communitySlice = createSlice({
  name: "community",
  initialState: {
    community: null, // Ensure this is initialized to prevent undefined errors
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
