import { createSlice } from '@reduxjs/toolkit';

/*
eslint no-param-reassign:["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }]
*/

const channelSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    activeChannelId: null,
  },
  reducers: {
    addChannel(state, { payload: { data: { id, attributes } } }) {
      state.channels.push(attributes);
      state.activeChannelId = id;
    },
    removeChannel(state, { payload: { data: { id } } }) {
      const newActiveChannelId = 1;
      state.channels = state.channels.filter((channel) => channel.id !== id);
      state.activeChannelId = newActiveChannelId;
    },
    renameChannel(state, { payload: { data: { id, attributes } } }) {
      const currentChannel = state.channels.find((channel) => channel.id === id);
      currentChannel.name = attributes.name;
    },
    setActiveChannelId(state, { payload: { id } }) {
      state.activeChannelId = id;
    },
  },
});

export const {
  addChannel, removeChannel, renameChannel, setActiveChannelId,
} = channelSlice.actions;

export default channelSlice.reducer;
