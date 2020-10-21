import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const addMessage = createAsyncThunk('messages/promiseStatus', async ({ currentChannelId, message }) => {
  const path = routes.channelMessagesPath(currentChannelId);
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
  },
});

export { addMessage };

export default chatFieldSlice.reducer;
