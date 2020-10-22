import React from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const messages = useSelector((state) => state.messages);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const filteredMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {filteredMessages.length > 0 && filteredMessages.map((m) => (
        <p key={m.id}>
          <b>{m.author}</b>
          {':'}
          {m.text}
        </p>
      ))}
    </div>
  );
};

export default Messages;
