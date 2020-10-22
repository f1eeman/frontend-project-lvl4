import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/App.jsx';
import rootReducer from './slices';
import getUserName from './cookie.js';
import Context from './Context.js';

const runApp = (initState) => {
  const { channels, messages, currentChannelId } = initState;
  const preloadedState = {
    channels,
    messages,
    currentChannelId,
  };

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
