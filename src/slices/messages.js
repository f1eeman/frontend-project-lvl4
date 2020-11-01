/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage(state, { payload: { data: { attributes } } }) {
      state.messages.push(attributes);
    },
    deleteMessages(state, { payload: { data: { id: removableChannelId } } }) {
      state.messages = state.messages.filter((message) => message.channelId !== removableChannelId);
    },
  },
});

export const { addMessage, deleteMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
