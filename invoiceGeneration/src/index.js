import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddItem from './containers/addItem';
import Invoice from './containers/invoice';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/checkout" component={Invoice} />
          <Route path="/" component={AddItem} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#app')
);

