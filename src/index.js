// @ts-check-ignore

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import io from 'socket.io-client';
import config from 'config';
import gon from 'gon';
import runApp from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
const socket = io();
runApp(gon, config, socket);
