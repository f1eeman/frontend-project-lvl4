import { combineReducers } from 'redux';
import channelsReducer, {
  addChannel,
  removeChannel,
  renameChannel,
  setActiveChannelId,
} from './channels';
import messagesReducer, { addMessage, deleteMessages } from './messages';
import modalsReducer, { showModal, hideModal } from './modals';
import removingProcessReducer, { changeStatus } from './removingProcess';

const actions = {
  setActiveChannelId,
  addChannel,
  removeChannel,
  renameChannel,
  addMessage,
  deleteMessages,
  showModal,
  hideModal,
  changeStatus,
};

const rootReducer = combineReducers({
  channelsInfo: channelsReducer,
  messagesInfo: messagesReducer,
  modalsInfo: modalsReducer,
  removingProcessInfo: removingProcessReducer,
});

export { actions };

export default rootReducer;
