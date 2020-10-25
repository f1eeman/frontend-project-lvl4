import { combineReducers } from 'redux';
import channelsReducer, {
  addChannel,
  removeChannel,
  renameChannel,
  setActiveId,
} from './channels';
import messagesReducer, { addMessage } from './messages';
import modalsReducer, { showModal, hideModal } from './modals';

const actions = {
  setActiveId,
  addChannel,
  removeChannel,
  renameChannel,
  addMessage,
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
