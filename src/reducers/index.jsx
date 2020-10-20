import { combineReducers } from 'redux';
import channelsReducer from '../features/channels/channelsSlice.jsx';
import setActiveIdRuducer from '../features/setActiveIdSlice.jsx';

export default combineReducers({
  channels: channelsReducer,
  currentChannelId: setActiveIdRuducer,
});
