import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ButtonGroup, Button } from 'react-bootstrap';
import RemoveIcon from 'bootstrap-icons/icons/x-square.svg';
import RenameIcon from 'bootstrap-icons/icons/pencil-square.svg';
import { actions } from '../slices';

const Channels = () => {
  const activeChannelId = useSelector((state) => state.channelsInfo.activeChannelId);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSetActiveChannel = (id) => () => {
    dispatch(actions.setActiveChannelId({ id }));
  };
  const handleShowRemoveModal = (channel) => () => {
    dispatch(actions.showModal({ type: 'removing', item: channel }));
  };
  const handleShowRenameModal = (channel) => () => {
    dispatch(actions.showModal({ type: 'renaming', item: channel }));
  };

  const renderSimpleButton = (channel) => {
    const variant = channel.id === activeChannelId ? 'primary' : 'light';
    return (
      <Button
        className="nav-link text-left btn-block mb-2"
        variant={variant}
        onClick={handleSetActiveChannel(channel.id)}
      >
        {channel.name}
      </Button>
    );
  };

  const renderDropdownButton = (channel) => {
    const variant = channel.id === activeChannelId ? 'primary' : 'light';
    return (
      <ButtonGroup className="d-flex mb-2">
        <Button
          className="nav-link text-left flex-grow-1"
          variant={variant}
          onClick={handleSetActiveChannel(channel.id)}
        >
          {channel.name}
        </Button>
        <Button
          className="flex-grow-0"
          variant={variant}
          onClick={handleShowRenameModal(channel)}
        >
          <RenameIcon />
        </Button>
        <Button
          className="flex-grow-0"
          variant={variant}
          onClick={handleShowRemoveModal(channel)}
        >
          <RemoveIcon />
        </Button>
      </ButtonGroup>
    );
  };

  const renderChannelsList = () => (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map((channel) => (
        <li key={channel.id} className="nav-item">
          {channel.removable ? renderDropdownButton(channel) : renderSimpleButton(channel)}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>{t('channelListTitle')}</span>
          <Button
            className="ml-auto p-0"
            variant="link"
            onClick={() => dispatch(actions.showModal({ type: 'adding', item: null }))}
          >
            +
          </Button>
        </div>
        {renderChannelsList()}
      </div>
    </>
  );
};

export default Channels;
