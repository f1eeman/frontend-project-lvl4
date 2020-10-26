import React, { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import Context from '../Context.js';

const Messages = () => {
  const { userName } = useContext(Context);
  const messages = useSelector((state) => state.messages);
  const { activeChannelId } = useSelector((state) => state.channels);
  const filteredMessages = messages.filter(({ channelId }) => channelId === activeChannelId);

  useEffect(() => {
    if (filteredMessages.length === 0) {
      return null;
    }
    const authorOfLastMessage = filteredMessages[filteredMessages.length - 1].author;
    if (authorOfLastMessage === userName) {
      const messagesBox = document.getElementById('messages-box');
      messagesBox.scrollTo(0, messagesBox.scrollHeight);
    }
    return null;
  }, [messages]);

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
