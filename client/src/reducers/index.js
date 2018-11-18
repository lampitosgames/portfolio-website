import { combineReducers } from 'redux';
import settings from './settings';
import error from './error';
import sidebar from './sidebar';

const mergedReducers = combineReducers({
    settings,
    error,
    sidebar
});

export default mergedReducers;
