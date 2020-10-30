/* eslint-disable no-param-reassign */
import { omit, forIn, difference } from 'lodash';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const asyncAddMessage = createAsyncThunk('addMessage', async ({ activeChannelId, message }) => {
  const path = routes.channelMessagesPath(activeChannelId);
  await axios.post(path, { data: { attributes: message } });
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    addMessage(state, { payload: { data: { id, attributes } } }) {
      state.byId[id] = attributes;
      state.allIds.push(id);
    },
    deleteMessages(state, { payload: { data: { id } } }) {
      const removableIds = [];
      forIn(state.byId, (message) => {
        if (message.channelId === id) {
          removableIds.push(message.id);
        }
      });
      state.byId = omit(state.byId, removableIds);
      state.allIds = difference(state.allIds, removableIds);
    },
  },
});

export { asyncAddMessage };

export const { addMessage, deleteMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
