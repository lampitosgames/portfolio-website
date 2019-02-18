//Stuff provided by react/redux
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
//Reducers, actions, middleware
import mergedReducers from './reducers';
import middleware from './middleware';
//Components
import App from './App';

let history = createBrowserHistory();

//Create the store by connecting reducers to middleware
let store = createStore(
  mergedReducers(history),
  applyMiddleware.apply(routerMiddleware(history), middleware)
);

//Render the app wrapped in Redux provider
ReactDOM.render(
  <Provider store={store} context={ReactReduxContext}>
    <ConnectedRouter history={history} context={ReactReduxContext}>
      <App/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);