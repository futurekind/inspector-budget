import { Map } from 'immutable';
import { APP__SET_NAV_INDEX } from '../actions/application';

export const initialState = Map({
    selectedNavIndex: -1
})

export default (state = initialState, action) => {

    switch(action.type) {

        case APP__SET_NAV_INDEX:
            return state.set('selectedNavIndex', action.index);

        default:
            return state;
    }

}