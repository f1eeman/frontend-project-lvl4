import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { actions } from '../slices';

const renderChannelsList = () => {
  const { channelsList, activeChannelId } = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const handleChangeChannel = (id) => () => {
    dispatch(actions.setActiveId({ id }));
  };
  return (
    <ul className="nav flex-column nav-pills nav-fill">
      {channelsList.map((c) => {
        const classes = cn({
          'nav-link': true,
          'btn-block': true,
          'mb-2': true,
          'text-left': true,
          btn: true,
          'btn-primary': c.id === activeChannelId,
          'btn-light': c.id !== activeChannelId,
        });
        return (
          <li key={c.id} className="nav-item">
            <button
              className={classes}
              type="button"
              onClick={handleChangeChannel(c.id)}
            >
              {c.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const Channels = ({ channels, activeChannelId }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
          <button
            className="ml-auto p-0 btn btn-link"
            type="button"
            onClick={() => dispatch(actions.showModal({ type: 'adding', item: null }))}
          >
            +
          </button>
        </div>
        {renderChannelsList({ channels, activeChannelId })}
      </div>
    </>
  );
};

export default Channels;
