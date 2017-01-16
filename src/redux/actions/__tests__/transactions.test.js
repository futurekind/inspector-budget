import * as actions from '../transactions';

describe('Transactions actions', () => {
    
    describe('createTransaction()', () => {

        it('throws error when amount or account_id are not present', () => {
            expect(() => {
                actions.createTransaction({
                    foo: 'bar'
                })
            }).toThrow()
        })

        it('returns action', () => {
            const action = actions.createTransaction({
                foo: 'bar',
                amount: 100,
                account_id: 'someaccount'
            })

            expect(action.type).toBe(actions.types.TRANSACTIONS__CREATE)
            expect(action.data.foo).toBe('bar')
            expect(action.data.id).toBeDefined()
            expect(action.data.createdAt).toBeDefined()
        })

    })

    describe('updateTransaction()', () => {
        it('throws error when amount, prev_amount or account_id are not present', () => {
            expect(() => {
                actions.updateTransaction('some_id', {
                    amount: 100,
                    account_id: 'some_account'
                })
            }).toThrow()
        })
        
        it('returns action', () => {
            expect(actions.updateTransaction('abc', {
                foo: 'baz',
                amount: 100,
                prev_amount: 90,
                account_id: 'some_account_id'
            })).toEqual({
                type: actions.types.TRANSACTIONS__UPDATE,
                id: 'abc',
                data: {
                    foo: 'baz',
                    amount: 100,
                    prev_amount: 90,
                    account_id: 'some_account_id'
                }
            })
        })
    })

    describe('deleteTransaction()', () => {
        it('throws error when amount or account_id are not present', () => {
            expect(() => {
                actions.deleteTransaction('some_id', {
                    account_id: 'some_account'
                })
            }).toThrow()
        })
        
        it('returns action', () => {
            expect(actions.deleteTransaction('abc', {
                foo: 'bar',
                amount: 100,
                account_id: 'some_account_id'
            })).toEqual({
                type: actions.types.TRANSACTIONS__DELETE,
                id: 'abc',
                data: {
                    foo: 'bar',
                    amount: 100,
                    account_id: 'some_account_id'
                }
            })
        })
    })
})