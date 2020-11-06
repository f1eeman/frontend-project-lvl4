/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { removeChannelFromServer } from './channels.js';

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage(state, { payload: { data: { attributes } } }) {
      state.messages.push(attributes);
    },
  },
  extraReducers: {
    [removeChannelFromServer.fulfilled]: (state, { payload: { id: removableChannelId } }) => {
      state.messages = state.messages.filter((message) => message.channelId !== removableChannelId);
    },
  },
});

export const { addMessage, deleteMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
