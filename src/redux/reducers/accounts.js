import { Map, List, fromJS } from 'immutable';
import { types } from '../actions/accounts';
import { types as apiActionTypes } from '../actions/api';
import { handle } from 'redux-pack';

export const initialState = Map({
    results: List(),
    entities: Map(),
    createDialogIsOpen: false
})

export default (state = initialState, action) => {
    
    switch(action.type) {
        case types.ACCOUNT__CREATE:
            return state
                .update('results', results => results.push(action.data.id))
                .update('entities', entities => entities.set(action.data.id, fromJS(action.data)));

        case types.ACCOUNT__UPDATE:
            return state.update('entities', 
                entities => entities.mergeIn([action.id], fromJS(action.data)) );

        case types.ACCOUNT__DELETE:
            const index = state.get('results').findIndex(res => res === action.id);
            return state
                .deleteIn(['results', index])
                .deleteIn(['entities', action.id])

        case types.ACCOUNT__CREATE_DIALOG_OPEN:
            return state.set('createDialogIsOpen', !state.get('createDialogIsOpen'))

        case apiActionTypes.API__LOAD:
            return handle(state, action, {
                success: state => {
                    const data = JSON.parse(action.payload);
                    return state
                            .set('results', fromJS(data.accounts.results))
                            .set('entities', fromJS(data.accounts.entities))
                }
            })

        default:
            return state;
    }


}