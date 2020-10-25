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
      console.log('messages b11efore', state);
      state.push({ ...action.payload.data.attributes });
      console.log('messages a11fter', state);
    },
    [removeChannel.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);
      console.log('messages before', state);
      state = state.filter(({ channelId }) => {
        console.log(channelId);
        return channelId !== payload.id;
      });
      console.log('messages after', state);
      return state;
    },
  },
});

export { addMessage };

export default chatFieldSlice.reducer;
