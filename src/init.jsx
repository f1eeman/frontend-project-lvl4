import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Rollbar from 'rollbar';
import App from './components/App.jsx';
import rootReducer from './slices';
import getUserName from './cookie.js';
import Context from './Context.js';
import './i18n.js';

const runApp = (initState) => {
  const { channels, messages, currentChannelId } = initState;
  const preloadedState = {
    channels: {
      channelsList: channels,
      activeChannelId: currentChannelId,
    },
    messages,
  };
  // eslint-disable-next-line no-unused-vars
  const rollbar = new Rollbar({
    accessToken: '940bc68f1a234163a90fc446b93f6850',
    captureUncaught: true,
    captureUnhandledRejections: true,
  });

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  render(
    <Provider store={store}>
      <Context.Provider value={{
        userName: getUserName(),
      }}
      >
        <App />
      </Context.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};

export default runApp;
