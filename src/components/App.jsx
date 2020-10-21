import React from 'react';
import Channels from './Channels';
import Messages from './Messages';
import ChatField from './ChatField';

const App = () => (
  <div className="row h-100 pb-3">
    <Channels />
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <Messages />
        <ChatField />
      </div>
    </div>
  </div>
);

export default App;
