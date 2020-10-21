import { createSlice } from '@reduxjs/toolkit';

const channelSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state) {
      state.push(1);
    },
  },
});

export const { addChannel } = channelSlice.actions;

export default channelSlice.reducer;
