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

const removeChannel = createAsyncThunk('channels/remove/promiseStatus', async ({ id }) => {
  console.log('id', id);
  const responce = await axios.delete(routes.channelPath(id));
  console.log('responce', responce);
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
      console.log('payload.id', payload.id);
      console.log('payload', payload);
      state.channelsList = state.channelsList.filter(({ id }) => id !== payload.id);
      state.activeChannelId = 1;
    },
  },
});

export { addChannel, removeChannel };
export const { setActiveId } = channelSlice.actions;

export default channelSlice.reducer;
