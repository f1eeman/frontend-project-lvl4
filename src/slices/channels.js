import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const addChannel = createAsyncThunk('channels/promiseStatus', async ({ channelName }) => {
  const path = routes.channelsPath();
  const responce = await axios.post(
    path, { data: { attributes: channelName } },
  );
  return responce.data;
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
    },
  },
});

export { addChannel };
export const { setActiveId } = channelSlice.actions;

export default channelSlice.reducer;
