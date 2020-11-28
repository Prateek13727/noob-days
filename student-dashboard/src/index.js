import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import reducers from './reducers';

import './styles/sass/main.scss';
import ListComponent from './components/StudentListComponent';
import DetailsComponent from './components/StudentDetailsComponent';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  	<BrowserRouter>
      <div>
        <Switch>
          <Route path="/student/:id" component={DetailsComponent} />
          <Route path="/" component={ListComponent} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#app'));

