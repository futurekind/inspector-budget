import reducer, { initialState } from '../application';
import * as fromActions from '../../actions/application';

describe('Application Reducer', () => {

    it('is defined', () => {
        expect(typeof reducer).toBe('function');
    })

    it('returns the initialState', () => {
        const state = reducer(undefined, {
            type: 'TEST'
        });
        
        expect(state).toBe(initialState)
    })

    it('responds to APP__SET_NAV_INDEX', () => {
        const state = reducer(undefined, fromActions.setNavIndex(1))

        expect(state.get('selectedNavIndex')).toBe(1)
    })

})