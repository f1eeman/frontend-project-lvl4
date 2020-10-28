// @ts-check-ignore

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import gon from 'gon';
import config from 'config';
import runApp from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('gon', gon);
console.log('config', config);
runApp(gon);
