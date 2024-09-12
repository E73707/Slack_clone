import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    channel: null,
  },
  reducers: {
    setChannel: (state, action) => {
      state.channel = action.payload;
    },
    clearChannel: (state) => {
      state.channel = null;
    },
  },
});

export const { setChannel, clearChannel } = channelSlice.actions;
export default channelSlice.reducer;
