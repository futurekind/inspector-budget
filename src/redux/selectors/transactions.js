import { createSelector } from 'reselect';

const resultsSelector = state => state.transactions.get('results')
const entitiesSelector = state => state.transactions.get('entities')

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

export const getTransactionsEntities = state => entitiesSelector(state).toJS()