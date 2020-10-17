// @ts-nocheck

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
// import faker from 'faker';
import gon from 'gon';
import run from './index.jsx';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);
run(gon);
