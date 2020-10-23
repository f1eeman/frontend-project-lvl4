import Add from './Add.jsx';
import Rename from './Rename.jsx';
import Remove from './Remove.jsx';

const modals = {
  adding: Add,
  renaming: Rename,
  removing: Remove,
};

const getModal = (modalName) => modals[modalName];

export default getModal;
