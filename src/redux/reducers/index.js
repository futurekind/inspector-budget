import { combineReducers } from 'redux';
import application from './application';
import accounts from './accounts';

export default combineReducers({
    application,
    accounts
});