import { combineReducers } from 'redux';
import channelsReducer, {
  addChannel,
  removeChannel,
  renameChannel,
  asyncAddChannel,
  asyncRemoveChannel,
  asyncRenameChannel,
  setActiveIdOfChannel,
} from './channels';
import messagesReducer, { addMessage, deleteMessages, asyncAddMessage } from './messages';
import modalsReducer, { showModal, hideModal } from './modals';

const actions = {
  setActiveIdOfChannel,
  addChannel,
  removeChannel,
  renameChannel,
  asyncAddChannel,
  asyncRemoveChannel,
  asyncRenameChannel,
  addMessage,
  asyncAddMessage,
  deleteMessages,
  showModal,
  hideModal,
};

const rootReducer = combineReducers({
  channels: channelsReducer,
  messages: messagesReducer,
  modals: modalsReducer,
});

export { actions };

export default rootReducer;
