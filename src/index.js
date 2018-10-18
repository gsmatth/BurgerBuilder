import React from 'react';
import ReactDOM from 'react-dom';
import{ BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import burgerReducer from './store/reducers/burgerReducer';
import checkoutReducer from './store/reducers/checkoutReducer';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
  burger: burgerReducer,
  checkout: checkoutReducer
})

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root'));
registerServiceWorker();
