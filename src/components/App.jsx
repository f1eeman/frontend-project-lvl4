import React from 'react';
import { useSelector } from 'react-redux';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import MessageForm from './MessageForm.jsx';
import getModal from './modals';

const renderModal = ({ modalInfo }) => {
  if (modalInfo.type === null) {
    return null;
  }
  const Component = getModal(modalInfo.type);
  return <Component />;
};

const App = () => {
  const modalInfo = useSelector((state) => state.modals);
  return (
    <div className="row h-100 pb-3">
      <Channels />
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <Messages />
          <MessageForm />
        </div>
      </div>
      {renderModal({ modalInfo })}
    </div>
  );
};
export default App;
