import store from './index';

describe('Redux Store', () => {

    it('is created', () => {
        expect(store.getState).toBeDefined();
    })

    it('exposes an `application` field', () => {
        const state = store.getState();

        expect(state.application).toBeDefined();
    })

    it('exposes an `accounts` field' , () => {
        const state = store.getState();
        expect(state.accounts).toBeDefined();
    })

})