import { combineReducers } from 'redux';
import channelsReducer, {
  addChannel,
  removeChannel,
  renameChannel,
  setActiveChannelId,
  removeChannelFromServer,
} from './channels';
import messagesReducer, { addMessage, deleteMessages } from './messages';
import modalsReducer, { showModal, hideModal } from './modals';

const actions = {
  setActiveChannelId,
  addChannel,
  removeChannel,
  renameChannel,
  removeChannelFromServer,
  addMessage,
  deleteMessages,
  showModal,
  hideModal,
};

const rootReducer = combineReducers({
  channelsInfo: channelsReducer,
  messagesInfo: messagesReducer,
  modalsInfo: modalsReducer,
});

export { actions };

export default rootReducer;
