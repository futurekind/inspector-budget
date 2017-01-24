import { Map } from 'immutable';
import { types } from '../actions/application';

export const initialState = Map({
    selectedNavIndex: -1,
    dirty: 0,
    lastSave: ''
})

export default (state = initialState, action) => {

    switch(action.type) {

        case types.APP__SET_NAV_INDEX:
            return state.set('selectedNavIndex', action.index);

        case types.APP__SET_DIRTY:
            return state.set('dirty', state.get('dirty') + 1)

        case types.APP__SET_LAST_SAVE:
            return state
                .set('lastSave', action.date)
                .set('dirty', 0)

        default:
            return state;
    }

}