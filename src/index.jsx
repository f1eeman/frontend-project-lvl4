import ReactDOM from 'react-dom';
import React from 'react';

const Channels = ({ props: { channels } }) => (
  channels.map((channel) => (
    <p key={channel.id}>{channel.name}</p>
  ))
);

const run = (state) => {
  ReactDOM.render(
    <Channels props={state} />,
    document.getElementById('chat'),
  );
};

export default run;
