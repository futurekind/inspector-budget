import * as actions from '../transactions';

describe('Transactions actions', () => {
    
    describe('createTransaction()', () => {

        it('returns action', () => {
            const action = actions.createTransaction({
                foo: 'bar'
            })

            expect(action.type).toBe(actions.types.TRANSACTIONS__CREATE)
            expect(action.data.foo).toBe('bar')
            expect(action.data.id).toBeDefined()
            expect(action.data.createdAt).toBeDefined()
        })

    })

    describe('updateTransaction()', () => {
        it('returns action', () => {
            expect(actions.updateTransaction('abc', {
                foo: 'baz'
            })).toEqual({
                type: actions.types.TRANSACTIONS__UPDATE,
                id: 'abc',
                data: {
                    foo: 'baz'
                }
            })
        })
    })

    describe('deleteTransaction()', () => {
        it('returns action', () => {
            expect(actions.deleteTransaction('abc')).toEqual({
                type: actions.types.TRANSACTIONS__DELETE,
                id: 'abc'
            })
        })
    })
})