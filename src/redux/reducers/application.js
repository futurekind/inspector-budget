import { Map } from 'immutable';

export const initialState = Map({
    selectedNavIndex: 0
})

export default (state = initialState, action) => {

    switch(action.type) {
        default:
            return state;
    }

}