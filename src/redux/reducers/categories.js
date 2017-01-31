import { Map, List, fromJS } from 'immutable';
import assign from 'lodash.assign'
import { types } from '../actions/categories';

export const initialState = Map({
    results: List(),
    entities: Map()
})

export default (state = initialState, action) => {
    switch(action.type) {

        case types.CAT__CREATE:
            return state
                .update('results', results => results.push(action.id))
                .update('entities', entities => entities.set(action.id, fromJS(
                    assign({}, action.payload, {
                        id: action.id
                    })
                )))

        case types.CAT__UPDATE:
            return state.update('entities', 
                entities => entities.mergeIn([action.id], fromJS(action.payload))
            )

        case types.CAT__DELETE:
            const index = state.get('results').findIndex(res => res === action.id);
            return state
                .deleteIn(['results', index])
                .deleteIn(['entities', action.id])

        default:
            return state;
    }
};