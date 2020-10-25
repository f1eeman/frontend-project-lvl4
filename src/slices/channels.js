import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

/*
eslint no-param-reassign:["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }]
*/

const addChannel = createAsyncThunk('channels/add/promiseStatus', async ({ channel }) => {
  const path = routes.channelsPath();
  const responce = await axios.post(
    path, { data: { attributes: channel } },
  );
  return responce.data;
});

const renameChannel = createAsyncThunk('channels/rename/promiseStatus', async ({ id, name }) => {
  const path = routes.channelPath(id);
  const responce = await axios.patch(
    path, { data: { attributes: { name } } },
  );
  return responce.data;
});

const removeChannel = createAsyncThunk('channels/remove/promiseStatus', async ({ id }) => {
  await axios.delete(routes.channelPath(id));
  return { id };
});

const channelSlice = createSlice({
  name: 'channels',
  initialState: {
    channelsList: [],
    activeChannelId: null,
  },
  reducers: {
    setActiveId(state, action) {
      state.activeChannelId = action.payload.id;
      return state;
    },
  },
  extraReducers: {
    [addChannel.fulfilled]: (state, action) => {
      state.channelsList.push({ ...action.payload.data.attributes });
      state.activeChannelId = action.payload.data.attributes.id;
    },
    [removeChannel.fulfilled]: (state, { payload }) => {
      state.channelsList = state.channelsList.filter(({ id }) => id !== payload.id);
      state.activeChannelId = 1;
    },
    [renameChannel.fulfilled]: (state, { payload }) => {
      const currentChannel = state.channelsList.find(
        ({ id }) => id !== payload.data.attributes.id,
      );
      currentChannel.name = payload.data.attributes.name;
    },
  },
});

export { addChannel, removeChannel, renameChannel };
export const { setActiveId } = channelSlice.actions;

export default channelSlice.reducer;
