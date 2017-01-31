import { createSelector } from 'reselect';

const entitiesSelector = state => state.categories.get('entities')
const resultsSelector = state => state.categories.get('results')

export const getCategories = createSelector(
    entitiesSelector,
    resultsSelector,

    (entities, results) => results.sort((a, b) => {
        const val1 = entities.getIn([a, 'name'])
        const val2 = entities.getIn([b, 'name'])

        if(val1 > val2) return 1
        return -1
    }).toJS()
)

export const getCategoriesEntities = state => entitiesSelector(state).toJS();