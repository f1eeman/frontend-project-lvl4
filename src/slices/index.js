import { combineReducers } from 'redux';
import channelsReducer, { addChannel, setActiveId } from './channels';
import messagesReducer, { addMessage } from './messages';

const actions = {
  setActiveId,
  addChannel,
  addMessage,
};

const rootReducer = combineReducers({
  channels: channelsReducer,
  messages: messagesReducer,
});

export { actions };

export default rootReducer;
