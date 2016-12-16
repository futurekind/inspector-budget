import reducer, { initialState } from './accounts';
import * as actions from '../actions/accounts';

describe('Accounts Reducer', () => {

    let state;

    it('returns a funtcion', () => {
        expect(typeof reducer).toBe('function');
    })

    it('returns the initial state', () => {
        const state = reducer(undefined, 'SOME_ACTION_TYPE');

        expect(state).toBe(initialState);
    })

    it('creates a new account', () => {
        const { createAccount } = actions;
        state = reducer(undefined, createAccount({
            name: 'Some new account',
            balance: 0.00,
            createdAt: '2016-12-16T13:58:55.428Z'
        }))

        state = reducer(state, createAccount({
            name: 'Anther new account',
            balance: 0.00,
            createdAt: '2016-12-16T14:58:55.428Z'
        }))

        expect(state.get('results')).toContain('account_1');
        expect(state.getIn(['entities', 'account_1']).toJS()).toEqual({
            name: 'Some new account',
            balance: 0.00,
            id: 'account_1',
            createdAt: '2016-12-16T13:58:55.428Z'
        });
    })

    it('updates an account', () => {
        const { updateAccount } = actions;
        state = reducer(state, updateAccount('account_1', {
            name: 'another name',
            foo: 'bar'
        }))

        const account = state.getIn(['entities', 'account_1']).toJS();

        expect(state.get('results').size).toBe(2);
        expect(account).toEqual({
            name: 'another name',
            balance: 0.00,
            id: 'account_1',
            createdAt: '2016-12-16T13:58:55.428Z',
            foo: 'bar'
        })

    })

    it('deletes an account', () => {
        const { deleteAccount } = actions;
        state = reducer(state, deleteAccount('account_1'))

        expect(state.get('results').toJS()).not.toContain('account_1');
        expect(state.get('entities').get('account_1')).not.toBeDefined();
    })

})