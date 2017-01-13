import reducer, { initialState } from '../transactions';
import * as actions from '../../actions/transactions';

describe('Transactions reducer', () => {

    it('is a function', () => {
        expect(typeof reducer).toBe('function')
    })

    it('returns its initial state', () => {
        const state = reducer(undefined, { type: 'some action' });
        expect(state).toBe(initialState)
    })

    describe('handles TRANSACTIONS__CREATE', () => {
        let state;

        beforeEach(() => {
            state = reducer(undefined, actions.createTransaction({
                foo: 'bar'
            }))
        })

        it('adds to results field', () => {
            expect(state.get('results').size).toBe(1)
        })

        it('adds to entities field', () => {
            const entities = state.get('entities');
            
            expect(entities.size).toBe(1)
            expect(entities.first().get('foo')).toBe('bar')
        })

    })

    describe('handles TRANSACTIONS__UPDATE', () => {
        let state;
        let transaction;
        let id;

        beforeEach(() => {
            state = reducer(undefined, actions.createTransaction({
                foo: 'bar'
            }))
            transaction = state.getIn(['entities', state.getIn(['results', 0])])
            id = transaction.get('id');
        })

        it('overwrites data', () => {
            state = reducer(state, actions.updateTransaction(id, {
                foo: 'baz'
            }))

            expect(state.getIn(['entities', id]).get('foo')).toBe('baz')
        })

        it('adds new data', () => {
            state = reducer(state, actions.updateTransaction(id, {
                newKey: 'some data'
            }))

            expect(state.getIn(['entities', id]).get('newKey')).toBe('some data')
        })

    })

    describe('handles TRANSACTIONS__DELETE', () => {
        let state;
        let transaction;
        let id;

        beforeEach(() => {
            state = reducer(undefined, actions.createTransaction({
                foo: 'bar'
            }))
            transaction = state.getIn(['entities', state.getIn(['results', 0])])
            id = transaction.get('id');
        })

        it('deletes from results field', () => {
            state = reducer(state, actions.deleteTransaction(id))

            expect(state.get('results').size).toBe(0)
        })

        it('deletes from entities field', () => {
            state = reducer(state, actions.deleteTransaction(id))
            expect(state.get('entities').size).toBe(0)
        })

    })

})