import { createSelector } from 'reselect';
import * as accountsSelectors from './accounts';

const resultsSelector = state => state.transactions.get('results')
const entitiesSelector = state => state.transactions.get('entities')
const dialogOpenSelector = state => state.transactions.get('dialogOpen')

export const getTransactions = createSelector(
    resultsSelector,
    entitiesSelector,

    (results, entities) => results.sort((a, b) => {
        const valA = entities.getIn([a, 'createdAt'])
        const valB = entities.getIn([b, 'createdAt'])

        if(valA < valB) return -1;
        return 1
    }).toJS()
)

export const getTransactionsByAccount = createSelector(
    getTransactions,
    entitiesSelector,
    accountsSelectors.getAccounts,
    accountsSelectors.getTabIndex,

    (transactions, entities, accounts, tabIndex) => transactions.filter( t => {
        const ta = entities.get(t);
        const accountId = accounts[tabIndex];
        return ta.get('account_id') === accountId
    } )
)

export const getTransactionsEntities = state => entitiesSelector(state).toJS()
export const getDialogOpen = state => dialogOpenSelector(state)