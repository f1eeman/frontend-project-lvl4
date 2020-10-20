import React from 'react';
import Channels from '../features/channels/Channels';
import Messages from '../features/messages/Messages';
import ChatField from '../features/chatField/ChatField';

const App = () => {
  const a = 5;
  return (
    <div className="row h-100 pb-3">
      <Channels />
      {/*
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <Messages />
          <ChatField />
        </div>
      </div>
      */}
    </div>
  );
};

export default App;
