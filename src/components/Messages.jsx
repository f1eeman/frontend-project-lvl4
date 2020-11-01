import React, { useEffect, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import Context from '../Context.js';

const Messages = () => {
  const { userName } = useContext(Context);
  const messages = useSelector((state) => state.messagesInfo.messages);
  const activeChannelId = useSelector((state) => state.channelsInfo.activeChannelId);
  const messagesOfActiveChannel = messages.filter(({ channelId }) => channelId === activeChannelId);
  const messagesBox = useRef(null);

  useEffect(() => {
    if (messagesOfActiveChannel.length === 0) {
      return null;
    }
    const lastMessage = messagesOfActiveChannel[messagesOfActiveChannel.length - 1];
    const { author: authorOfLastMessage } = lastMessage;
    if (authorOfLastMessage === userName) {
      messagesBox.current.scrollTo(0, messagesBox.current.scrollHeight);
    }
    return null;
  }, [messages]);

  const renderMessages = () => {
    if (messagesOfActiveChannel.length === 0) {
      return null;
    }
    return (
      <>
        {messagesOfActiveChannel.map((message) => (
          <p key={message.id}>
            <b>{message.author}</b>
            {':'}
            {message.text}
          </p>
        ))}
      </>
    );
  };

  return (
    <div id="messages-box" ref={messagesBox} className="chat-messages overflow-auto mb-3">
      {renderMessages()}
    </div>
  );
};

export default Messages;
