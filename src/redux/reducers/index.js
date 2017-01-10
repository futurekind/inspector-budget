import { combineReducers } from 'redux';
import application from './application';
import accounts from './accounts';
import transactions from './transactions';

export default combineReducers({
    application,
    accounts,
    transactions
});