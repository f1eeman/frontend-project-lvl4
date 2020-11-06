import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const activeChannelId = useSelector((state) => state.channelsInfo.activeChannelId);
  const messagesOfActiveChannel = useSelector((state) => state.messagesInfo.messages.filter(
    ({ channelId }) => channelId === activeChannelId,
  ));
  const messagesBox = useRef(null);

  useEffect(() => {
    messagesBox.current.scrollTo(0, messagesBox.current.scrollHeight);
  }, [messagesOfActiveChannel]);

  const renderMessages = () => (
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

  return (
    <div id="messages-box" ref={messagesBox} className="chat-messages overflow-auto mb-3">
      {renderMessages()}
    </div>
  );
};

export default Messages;
