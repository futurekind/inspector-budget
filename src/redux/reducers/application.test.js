import reducer, { initialState } from './application';

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

})