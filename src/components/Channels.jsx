import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import {
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import { actions } from '../slices';

const renderSimpleButton = ({
  channel,
  activeChannelId,
  handleChangeActiveChannel,
}) => {
  const variant = channel.id === activeChannelId ? 'primary' : 'light';
  const classes = {
    'nav-link': true,
    'text-left': true,
    'btn-block': true,
    'mb-2': true,
  };
  return (
    <Button
      className={classes}
      variant={variant}
      onClick={handleChangeActiveChannel(channel.id)}
    >
      {channel.name}
    </Button>
  );
};

const renderDropdownButton = ({
  channel,
  activeChannelId,
  handleChangeActiveChannel,
  handleShowRemoveModal,
  handleShowRenameModal,
}) => {
  const variant = channel.id === activeChannelId ? 'primary' : 'light';
  const buttonClasses = cn({
    'nav-link': true,
    'text-left': true,
    'flex-grow-1': true,
  });
  const toggleClasses = cn({
    'flex-grow-0': true,
  });
  return (
    <ButtonGroup className="d-flex mb-2">
      <Button
        className={buttonClasses}
        variant={variant}
        onClick={handleChangeActiveChannel(channel.id)}
      >
        {channel.name}
      </Button>
      <Button
        className={toggleClasses}
        variant={variant}
        onClick={handleShowRemoveModal(channel)}
      >
        ReM
      </Button>
      <Button
        className={toggleClasses}
        variant={variant}
        onClick={handleShowRenameModal(channel)}
      >
        ReN
      </Button>
    </ButtonGroup>
  );
};

const renderChannelsList = ({ channelsList, activeChannelId, dispatch }) => {
  const handleChangeActiveChannel = (id) => () => {
    dispatch(actions.setActiveId({ id }));
  };
  const handleShowRemoveModal = (channel) => () => {
    dispatch(actions.showModal({ type: 'removing', item: channel }));
  };
  const handleShowRenameModal = (channel) => () => {
    dispatch(actions.showModal({ type: 'renaming', item: channel }));
  };
  return (
    <ul className="nav flex-column nav-pills nav-fill">
      {channelsList.map((channel) => (
        <li key={channel.id} className="nav-item">
          {channel.removable ? (
            renderDropdownButton({
              channel,
              activeChannelId,
              handleChangeActiveChannel,
              handleShowRemoveModal,
              handleShowRenameModal,
            })) : (
            renderSimpleButton({
              channel, activeChannelId, handleChangeActiveChannel,
            })
          )}
        </li>
      ))}
    </ul>
  );
};

const Channels = () => {
  const { channelsList, activeChannelId } = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
        {renderChannelsList({ channelsList, activeChannelId, dispatch })}
      </div>
    </>
  );
};

export default Channels;
