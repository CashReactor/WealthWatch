import { createStore } from 'redux';

import reducers from '../reducers';
import initialState from './initial-state';

const store = createStore(reducers, initialState);
