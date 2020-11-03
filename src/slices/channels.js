import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from 'lodash';
import axios from 'axios';
import routes from '../routes.js';

/*
eslint no-param-reassign:["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }]
*/
const removeChannelFromServer = createAsyncThunk('removeChannel', async ({ id }) => {
  await axios.delete(routes.channelPath(id));
});

const channelSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    activeChannelId: null,
    removeStatus: 'idle',
  },
  reducers: {
    addChannel(state, { payload: { data: { id, attributes } } }) {
      state.channels.push(attributes);
      state.activeChannelId = id;
    },
    removeChannel(state, { payload: { data: { id } } }) {
      state.channels = state.channels.filter((channel) => channel.id !== id);
      if (state.activeChannelId === id) {
        state.activeChannelId = get(state.channels, '0.id', null);
      }
    },
    renameChannel(state, { payload: { data: { id, attributes } } }) {
      state.channels = state.channels.map((channel) => {
        if (channel.id === id) {
          return attributes;
        }
        return channel;
      });
    },
    setActiveChannelId(state, { payload: { id } }) {
      state.activeChannelId = id;
    },
  },
  extraReducers: {
    [removeChannelFromServer.pending]: (state) => {
      state.removeStatus = 'removing';
    },
    [removeChannelFromServer.fulfilled]: (state) => {
      state.removeStatus = 'complete';
    },
    [removeChannelFromServer.rejected]: (state) => {
      state.removeStatus = 'failed';
    },
  },
});

export { removeChannelFromServer };

export const {
  addChannel, removeChannel, renameChannel, setActiveChannelId,
} = channelSlice.actions;

export default channelSlice.reducer;
