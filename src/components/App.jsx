import React from 'react';
import { useSelector } from 'react-redux';
import Channels from './Channels';
import Messages from './Messages';
import ChatField from './ChatField';
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
  console.log('modalInfo', modalInfo);
  return (
    <div className="row h-100 pb-3">
      <Channels />
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <Messages />
          <ChatField />
        </div>
      </div>
      {renderModal({ modalInfo })}
    </div>
  );
};
export default App;
