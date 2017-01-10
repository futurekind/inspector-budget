import * as actions from '../transactions';

describe('Transactions actions', () => {
    
    describe('createTransaction()', () => {

        it('returns action', () => {
            expect(actions.createTransaction({
                foo: 'bar'
            })).toEqual({
                type: actions.types.TRANSACTIONS__CREATE,
                data: {
                    foo: 'bar'
                }
            })
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
})