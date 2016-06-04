import React from 'react';
import ReactDOM from 'react-dom';
import { Provider  } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import './src/styles/main.scss';
import WixEditor from './src/app.js';

import reducers from './src/scripts/reducers/text-generator';
const createStoreWithMiddleWare = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleWare(reducers);

ReactDOM.render(
  <Provider store={store}>
    <WixEditor />
  </Provider>,
  document.getElementById('root')
);

