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

const chatFieldSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
  },
  extraReducers: {
    [addMessage.fulfilled]: (state, action) => {
      state.push({ ...action.payload.data.attributes });
    },
    [removeChannel.fulfilled]: (state, { payload }) => (
      state.filter(({ channelId }) => channelId !== payload.id)
    ),
  },
});

export { addMessage };

export default chatFieldSlice.reducer;
