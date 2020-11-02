import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
    removingChannelInfo: {
      status: 'pending',
    },
  },
  reducers: {
    addChannel(state, { payload: { data: { id, attributes } } }) {
      state.channels.push(attributes);
      state.activeChannelId = id;
    },
    removeChannel(state, { payload: { data: { id } } }) {
      const changeActiveChannelId = () => {
        if (state.channels.length === 0) {
          state.activeChannelId = null;
        } else {
          const { channels } = state;
          const firstChannel = channels[0];
          state.activeChannelId = firstChannel.id;
        }
      };

      state.channels = state.channels.filter((channel) => channel.id !== id);
      if (state.activeChannelId === id) {
        changeActiveChannelId();
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
      state.removingChannelInfo.status = 'removing';
    },
    [removeChannelFromServer.fulfilled]: (state) => {
      state.removingChannelInfo.status = 'finished';
    },
    [removeChannelFromServer.rejected]: (state) => {
      state.removingChannelInfo.status = 'failed';
    },
  },
});

export { removeChannelFromServer };

export const {
  addChannel, removeChannel, renameChannel, setActiveChannelId,
} = channelSlice.actions;

export default channelSlice.reducer;
