import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';

const news = (state = [], action) => {
   switch (action.type) {
      case 'SET_NEWS':
         return action.payload;
      default:
         return state;
   }
};

const storeInstance = createStore(
   combineReducers({
      news
   }),
   applyMiddleware(logger)
);

ReactDOM.render(
   <Provider store={storeInstance}>
      <App />
   </Provider>,
   document.getElementById('root')
);
