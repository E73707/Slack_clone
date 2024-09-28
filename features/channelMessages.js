import { createSlice } from "@reduxjs/toolkit";

const channelMessagesSlice = createSlice({
  name: "channelMessages",
  initialState: {
    channelMessages: [],
  },
  reducers: {
    setChannelMessages: (state, action) => {
      state.channelMessages = action.payload;
    },
    clearChannelMessages: (state) => {
      state.channelMessages = [];
    },
  },
});

export const { setChannelMessages, clearChannelMessages } =
  channelMessagesSlice.actions;
export default channelMessagesSlice.reducer;
