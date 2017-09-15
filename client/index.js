'use strict'

import './stylesheets/index.scss'

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';

import Root from './components/Root.jsx';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Root />
    </Router>
  </Provider>,
  document.getElementById('app')
);
