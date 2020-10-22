// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

// import faker from 'faker';
import gon from 'gon';
import io from 'socket.io-client';
import runApp from './app.jsx';
// import cookies from 'js-cookie';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);
const socket = io();
socket.on('newMessage', ({ data: { attributes } }) => {
  gon.messages.push(attributes);
});
runApp(gon);
