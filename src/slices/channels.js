import { omit, without } from 'lodash';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

/*
eslint no-param-reassign:["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }]
*/

const asyncAddChannel = createAsyncThunk('addChannel', async ({ channel }) => {
  const path = routes.channelsPath();
  await axios.post(
    path, { data: { attributes: channel } },
  );
});

const asyncRenameChannel = createAsyncThunk('renameChannel', async ({ id, name }) => {
  const path = routes.channelPath(id);
  await axios.patch(
    path, { data: { attributes: { name } } },
  );
});

const asyncRemoveChannel = createAsyncThunk('removeChannel', async ({ id }) => {
  await axios.delete(routes.channelPath(id));
  return { id };
});

const channelSlice = createSlice({
  name: 'channels',
  initialState: {
    byId: {},
    allIds: [],
    activeChannelId: null,
  },
  reducers: {
    addChannel(state, { payload: { data: { id, attributes } } }) {
      state.byId[id] = attributes;
      state.allIds.push(id);
      state.activeChannelId = id;
    },
    removeChannel(state, { payload: { data: { id } } }) {
      state.byId = omit(state.byId, id);
      state.allIds = without(state.allIds, id);
      state.activeChannelId = 1;
    },
    renameChannel(state, { payload: { data: { id, attributes } } }) {
      const currentChannel = state.byId[id];
      currentChannel.name = attributes.name;
    },
    setActiveIdOfChannel(state, { payload: { id } }) {
      state.activeChannelId = id;
    },
  },
});

export { asyncAddChannel, asyncRemoveChannel, asyncRenameChannel };
export const {
  addChannel, removeChannel, renameChannel, setActiveIdOfChannel,
} = channelSlice.actions;

export default channelSlice.reducer;
