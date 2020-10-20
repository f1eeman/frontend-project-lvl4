import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/App.jsx';
import rootReducer from './reducers';

const run = (initState) => {
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
      <App />
    </Provider>,
    document.getElementById('chat'),
  );
};

export default run;
