import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';

import './styles/css/styles.css';
import reducers from './reducers';
import CryptoListView from './containers/cryptoListView';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <CryptoListView />
  </Provider>
  , document.querySelector('#app'));

