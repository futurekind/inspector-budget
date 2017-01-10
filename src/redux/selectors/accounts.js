import { createSelector } from 'reselect';

const results = state => state.accounts.get('results');
const entities = state => state.accounts.get('entities');

export const getAccounts = createSelector(
    results,
    entities,
    (results, entities) => results.sort((a, b) => {
        const one = entities.get(a);
        const two = entities.get(b);
        
        if (one.get('createdAt') < two.get('createdAt')) return -1

        return 1
    }).toJS()
)

export const getAccountById = createSelector(
    entities,
    (state, props) => props,

    (entities, id) => {
        if(entities.size > 0) {
            return entities.get(id).toJS()
        } else {
            return {}
        }
    }
)

export const getCreateDialogIsOpen = state => state.accounts.get('createDialogIsOpen');
export const getEditDialogIsOpen = state => state.accounts.get('editDialogIsOpen');

export const getTabIndex = state => state.accounts.get('tabIndex')