import { Map } from 'immutable';
import { types } from '../actions/application';

export const initialState = Map({
    selectedNavIndex: -1,
    dirty: false,
    lastSave: ''
})

export default (state = initialState, action) => {

    switch(action.type) {

        case types.APP__SET_NAV_INDEX:
            return state.set('selectedNavIndex', action.index);

        case types.APP__SET_DIRTY:
            if(state.get('dirty') ===  true)
                return state;
                
            return state.set('dirty', true)

        default:
            return state;
    }

}