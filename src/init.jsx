import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Rollbar from 'rollbar';
import io from 'socket.io-client';
import config from 'config';
import App from './components/App.jsx';
import setUserName from './user.js';
import Context from './Context.js';
import initI18n from './i18n.js';
import reducer, { actions } from './slices';

const runApp = (initState) => {
  initI18n();
  // eslint-disable-next-line no-new
  new Rollbar({
    accessToken: config.rollbar_client_token,
    captureUncaught: true,
    captureUnhandledRejections: true,
  });
  const { channels, messages, currentChannelId } = initState;
  const preloadedState = {
    channelsInfo: {
      channels,
      activeChannelId: currentChannelId,
    },
    messagesInfo: {
      messages,
    },
  };
  const store = configureStore({
    reducer,
    preloadedState,
  });
  const socket = io();
  socket.on('newMessage', ({ data }) => {
    store.dispatch(actions.addMessage({ data }));
  });
  socket.on('newChannel', ({ data }) => {
    store.dispatch(actions.addChannel({ data }));
  });
  socket.on('renameChannel', ({ data }) => {
    store.dispatch(actions.renameChannel({ data }));
  });
  socket.on('removeChannel', ({ data }) => {
    store.dispatch(actions.removeChannel({ data }));
    store.dispatch(actions.deleteMessages({ data }));
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
