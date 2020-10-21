import { combineReducers } from 'redux';
import setActiveIdReducer, { setActiveId } from './activeId';
import channelsReducer, { addChannel } from './channels';
import messagesReducer, { addMessage } from './chatField';

const actions = {
  setActiveId,
  addChannel,
  addMessage,
};

const rootReducer = combineReducers({
  channels: channelsReducer,
  currentChannelId: setActiveIdReducer,
  messages: messagesReducer,
});

export { actions };

export default rootReducer;
