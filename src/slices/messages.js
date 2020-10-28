/* eslint-disable no-param-reassign */
import { omitBy } from 'lodash';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';
import { removeChannel } from './channels.js';

const addMessage = createAsyncThunk('messages/promiseStatus', async ({ activeChannelId, message }) => {
  const path = routes.channelMessagesPath(activeChannelId);
  const responce = await axios.post(
    path, { data: { attributes: message } },
  );
  return responce.data;
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {},
  reducers: {
  },
  extraReducers: {
    [addMessage.fulfilled]: (state, { payload: { data } }) => {
      state[data.id] = data.attributes;
    },
    [removeChannel.fulfilled]: (state, { payload }) => (
      omitBy(state, ({ channelId }) => channelId === payload.id)
    ),
  },
});

export { addMessage };

export default messagesSlice.reducer;
