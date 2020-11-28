import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import './styles/css/styles.css';
import ContainerComponent from './container/NetflixShowsContainerComponent';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <ContainerComponent />
  </Provider>
  , document.querySelector('#app'));

