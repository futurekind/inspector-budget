import { Map, List, fromJS } from 'immutable';
import { types } from '../actions/accounts';

export const initialState = Map({
    results: List(),
    entities: Map() 
})

export default (state = initialState, action) => {
    
    switch(action.type) {
        case types.ACCOUNT__CREATE:
            return state
                .update('results', results => results.push(action.data.id))
                .update('entities', entities => entities.set(action.data.id, fromJS(action.data)));
            break;

        case types.ACCOUNT__UPDATE:
            return state.update('entities', 
                entities => entities.mergeIn([action.id], fromJS(action.data)) );
            break;

        case types.ACCOUNT__DELETE:
            const index = state.get('results').findIndex(res => res === action.id);
            return state
                .deleteIn(['results', index])
                .deleteIn(['entities', action.id])
            break;

        default:
            return state;
    }


}