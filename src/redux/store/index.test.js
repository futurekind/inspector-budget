import store from './index';
import * as ta from '../actions/transactions';
import * as aa from '../actions/accounts';

const localStorageMock = {
    getItem: () => {}
}

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

    it('exposes an `transactions` field', () => {
        expect(store.getState().transactions).toBeDefined()
    })
    
    describe('Edge-Case: account balance calculation', () => {
        global.localStorage = localStorageMock

        store.dispatch(
            aa.createAccount({
                name: 'Account 1',
                balance: 120
            })
        )

        const account_id = store.getState().accounts.getIn(['results', 0])

        it(`calculates correct account balance with ${ta.types.TRANSACTIONS__CREATE}`, () => {
            store.dispatch(
                ta.createTransaction({
                    account_id,
                    amount: -100
                })
            )

            const account = store.getState().accounts.getIn(['entities', account_id])

            expect(
                account.get('balance')
            ).toBe(20)
        })

        it(`calculates correct account balance with ${ta.types.TRANSACTIONS__UPDATE}`, () => {
            const taId = store.getState().transactions.getIn(['results', 0]);

            store.dispatch(
                ta.updateTransaction(taId, {
                    account_id,
                    amount: -20,
                    prev_amount: -100
                })
            )
            
            let account = store.getState().accounts.getIn(['entities', account_id])
            let newBalance = store.getState().accounts.getIn(['entities', account_id, 'balance'])

            expect(
                account.get('balance')
            ).toBe(100)

            store.dispatch(
                ta.updateTransaction(taId, {
                    account_id,
                    amount: 100,
                    prev_amount: -20
                })
            )
            
            account = store.getState().accounts.getIn(['entities', account_id])
            newBalance = store.getState().accounts.getIn(['entities', account_id, 'balance'])

            expect(
                account.get('balance')
            ).toBe(220)

            store.dispatch(
                ta.updateTransaction(taId, {
                    account_id,
                    amount: 100,
                    prev_amount: 100
                })
            )
            
            account = store.getState().accounts.getIn(['entities', account_id])
            newBalance = store.getState().accounts.getIn(['entities', account_id, 'balance'])

            expect(
                account.get('balance')
            ).toBe(220)

            store.dispatch(
                ta.updateTransaction(taId, {
                    account_id,
                    amount: -15,
                    prev_amount: 100
                })
            )
            
            account = store.getState().accounts.getIn(['entities', account_id])
            newBalance = store.getState().accounts.getIn(['entities', account_id, 'balance'])

            expect(
                account.get('balance')
            ).toBe(105)

            store.dispatch(
                ta.updateTransaction(taId, {
                    account_id,
                    amount: -120,
                    prev_amount: -15
                })
            )
            
            account = store.getState().accounts.getIn(['entities', account_id])
            newBalance = store.getState().accounts.getIn(['entities', account_id, 'balance'])

            expect(
                account.get('balance')
            ).toBe(0)
        })
    })

    it(`calculates correct account balance with ${ta.types.TRANSACTIONS__CREATE}`, () => {
        const taId = store.getState().transactions.getIn(['results', 0]);
        const account_id = store.getState().accounts.getIn(['results', 0])

        store.dispatch(ta.createTransaction({
            account_id,
            amount: -100
        }))

        store.dispatch(ta.deleteTransaction(taId, {
            amount: -120,
            account_id
        }))

        expect(store.getState().accounts.getIn([
            'entities',
            account_id,
            'balance'
        ])).toBe(20)
    });

})