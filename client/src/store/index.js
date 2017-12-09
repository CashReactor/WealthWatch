import { applyMiddleware, createStore } from 'redux';
import reducers from '../reducers';
import initialState from './initial-state';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

const middleware = applyMiddleware(promise(), thunk, logger());
const store = createStore(reducers, middleware);

const reducer = (state={}, action) => {
  switch (action.type) {
    case "FETCH_BUDGET": {
      return Object.assign({}, state, "budget": action.budget);
      break;
    }
  }
}