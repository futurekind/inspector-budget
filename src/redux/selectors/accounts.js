import { createSelector } from 'reselect';

const results = state => state.accounts.get('results');
const entities = state => state.accounts.get('entities');
const createDialogIsOpen = state => state.accounts.get('createDialogIsOpen');

export const getAccounts = createSelector(
    results,
    entities,
    (results, entities) => results.sort((a, b) => {
        const one = entities.get(a);
        const two = entities.get(b);
        
        if (one.get('name') < two.get('name')) return -1

        return 1
    }).toJS()
)

export const getAccountById = createSelector(
    entities,
    (state, props) => props,

    (entities, id) => entities.get(id).toJS()
)

export const getCreateDialogIsOpen = createSelector(
    createDialogIsOpen,
    open => open
)