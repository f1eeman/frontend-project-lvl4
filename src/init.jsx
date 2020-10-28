import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Rollbar from 'rollbar';
import io from 'socket.io-client';
import App from './components/App.jsx';
import reducer from './slices';
import setUserName from './user.js';
import Context from './Context.js';
import initI18n from './i18n.js';

const runApp = (initState) => {
  initI18n();
  const { channels, messages, currentChannelId } = initState;
  const preloadedState = {
    channels: {
      channelsList: channels,
      activeChannelId: currentChannelId,
    },
    messages,
  };
  const socket = io();
  socket.on('newMessage', ({ data }) => {
    preloadedState.messages[data.id] = data.attributes;
  });
  socket.on('newChannel', ({ data: { attributes } }) => {
    preloadedState.channels.channelsList.push(attributes);
  });
  socket.on('renameChannel', ({ data: { attributes, id } }) => {
    const currentChannel = preloadedState.channels.channelsList.find(
      (channel) => channel.id === id,
    );
    currentChannel.name = attributes.name;
  });
  socket.on('removeChannel', ({ data: { id } }) => {
    preloadedState.channels.channelsList.filter((channel) => channel.id !== id);
  });
  // eslint-disable-next-line no-new
  new Rollbar({
    accessToken: '940bc68f1a234163a90fc446b93f6850',
    captureUncaught: true,
    captureUnhandledRejections: true,
  });

  const store = configureStore({
    reducer,
    preloadedState,
  });

  render(
    <Provider store={store}>
      <Context.Provider value={{
        userName: setUserName(),
      }}
      >
        <App />
      </Context.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};

export default runApp;
