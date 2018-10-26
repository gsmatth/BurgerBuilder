import React from 'react';
import ReactDOM from 'react-dom';
import{ BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import burgerBuilderReducer from './store/reducers/burgerBuilderReducer';
import orderReducer from './store/reducers/orderReducer';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
  burger: burgerBuilderReducer,
  order: orderReducer
})

const logger = store => {
  return next => {
    console.log('[Middleware] value of next: ', next);
    return action => {
      console.log('[Middleware] the action being dispatched: ', action);
      const result = next(action);
      console.log('[Middleware] next state: ', store.getState());
      return result;
    }
  }
}

//allows use of redux tool browser plugin https://github.com/zalmoxisus/redux-devtools-extension#usage
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, /* preloadedState, */ 
  composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root'));
registerServiceWorker();
