import reducer, { initialState } from '../application';
import * as fromActions from '../../actions/application';

describe('Application Reducer', () => {
    let state;

    it('is defined', () => {
        expect(typeof reducer).toBe('function');
    })

    it('returns the initialState', () => {
        state = reducer(undefined, {
            type: 'TEST'
        });
        
        expect(state).toBe(initialState)
    })

    it('responds to APP__SET_NAV_INDEX', () => {
        state = reducer(undefined, fromActions.setNavIndex(1))

        expect(state.get('selectedNavIndex')).toBe(1)
    })

    it('handles APP__SET_DIRTY', () => {
        state = reducer(undefined, fromActions.setDirty())
        expect(state.get('dirty')).toBe(true)
    })

})