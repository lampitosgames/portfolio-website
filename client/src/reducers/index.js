import { combineReducers } from 'redux';
import settings from './settings';
import error from './error';

const mergedReducers = combineReducers({
    settings,
    error
});

export default mergedReducers;
