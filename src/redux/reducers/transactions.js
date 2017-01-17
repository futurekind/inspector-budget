import { Map, List, fromJS } from 'immutable';
import { types } from '../actions/transactions';

export const initialState = Map({
    results: List(),
    entities: Map(),
    dialogOpen: false
})

export default (state = initialState, action) => {
    switch(action.type) {
        
        case types.TRANSACTIONS__CREATE:
            return state
                    .update('results', results => results.push(action.data.id))
                    .update('entities', entities => entities.set(action.data.id, fromJS(action.data)))

        case types.TRANSACTIONS__UPDATE:
            return state.update('entities', 
                entities => entities.mergeIn([action.id], fromJS(action.data)) );

        case types.TRANSACTIONS__DELETE:
            const index = state.get('results').findIndex(result => result === action.id);
            return state
                .deleteIn(['results', index])
                .deleteIn(['entities', action.id])

        case types.TRANSACTIONS__TOGGLE_DIALOG:
            return state.set('dialogOpen', !state.get('dialogOpen'))

        default:
            return state;
    }
};