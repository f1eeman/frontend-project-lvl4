import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

const renderChannelsList = () => {
  const channels = useSelector((state) => state.channels);
  const activeChannelId = useSelector((state) => state.currentChannelId);
  return (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map((c) => {
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
            <button className={classes} type="button">{c.name}</button>
          </li>
        );
      })}
    </ul>
  );
};

const Channels = ({ channels, activeChannelId }) => (
  <>
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button className="ml-auto p-0 btn btn-link" type="button">+</button>
      </div>
      {renderChannelsList({ channels, activeChannelId })}
    </div>
  </>
);

export default Channels;
