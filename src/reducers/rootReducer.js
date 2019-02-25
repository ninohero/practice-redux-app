/*
 src/reducers/rootReducer.js
*/
import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import reducers from './reducers';

export default combineReducers({
  simpleReducer,
  reducers
});
