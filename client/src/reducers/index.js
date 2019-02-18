import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import settings from './settings';
import error from './error';
import sidebar from './sidebar';

const mergedReducers = (history) => combineReducers({
  router: connectRouter(history),
  settings,
  error,
  sidebar
});

export default mergedReducers;