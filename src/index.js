import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';

const news = (state = [], action) => {
   if (action.type === 'SET_NEWS') {
      return action.payload;
   }
   return state;
};

const currentFeed = (state = [], action) => {
   if (action.type === 'SET_CURRENT_FEED') {
      return action.payload;
   }
   return state;
};

const storeInstance = createStore(
   combineReducers({
      news,
      currentFeed
   }),
   applyMiddleware(logger)
);

ReactDOM.render(
   <Provider store={storeInstance}>
      <App />
   </Provider>,
   document.getElementById('root')
);
