import reducer, { initialState } from '../accounts';
import * as actions from '../../actions/accounts';
import * as transactionsActions from '../../actions/transactions';

describe('Accounts Reducer', () => {

    let state, acc1, acc2;

    const stateForTransactions = reducer(undefined, actions.createAccount({
        name: 'Testaccount', balance: 300.47
    }))

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
        }))

        state = reducer(state, createAccount({
            name: 'Anther new account',
            balance: 987.65,
        }))

        acc1 = state.getIn(['entities', 
            state.getIn(['results', 0]),
        ])
        acc2 = state.getIn(['entities', 
            state.getIn(['results', 1]),
        ])

        const tabIndex = state.get('tabIndex')

        expect(state.get('results').size).toBe(2);
        expect(acc1.get('name')).toBe('Some new account')
        expect(acc1.get('balance')).toBe(0.00)
        expect(acc1.get('id')).toBeDefined()
        expect(acc1.get('createdAt')).toBeDefined()
        expect(acc2.get('name')).toBe('Anther new account')
        expect(acc2.get('balance')).toBe(987.65)
        expect(acc2.get('id')).toBeDefined()
        expect(acc2.get('createdAt')).toBeDefined()
        expect(tabIndex).toBe(state.get('results').size - 1)
        
    })

    it('updates an account', () => {
        const { updateAccount } = actions;
        
        state = reducer(state, updateAccount(acc1.get('id'), {
            name: 'another name',
            foo: 'bar'
        }))

        const account = state.getIn(['entities', acc1.get('id')]).toJS();

        expect(state.get('results').size).toBe(2);
        expect(account.name).toBe('another name')
        expect(account.balance).toBe(0.00)
        expect(account.foo).toBe('bar')

    })

    it('deletes an account', () => {
        const { deleteAccount } = actions;
        state = reducer(state, deleteAccount(acc1.get('id')))

        expect(state.get('results').toJS()).not.toContain(acc1.get('id'));
        expect(state.get('entities').get(acc1.get('id'))).not.toBeDefined();
        expect(state.get('tabIndex')).toBe(0)
    })

    it('sets createDialogIsOpen to true', () => {
        const { toggleCreateDialog } = actions;
        state = reducer(undefined, toggleCreateDialog());

        expect(state.get('createDialogIsOpen')).toBe(true)
    })

    it('sets createDialogIsOpen to false', () => {
        const { toggleCreateDialog } = actions;
        state = reducer(state, toggleCreateDialog());

        expect(state.get('createDialogIsOpen')).toBe(false)
    })

    it('sets tabIndex', () => {
        const { setTabIndex } = actions;
        state = reducer(undefined, setTabIndex(2));

        expect(state.get('tabIndex')).toBe(2)
    })

    it('toggles editDialogIsOpen', () => {
        const { toggleEditDialog } = actions;
        state = reducer(undefined, toggleEditDialog())

        expect(state.get('editDialogIsOpen')).toBe(true)

        state = reducer(state, toggleEditDialog())
        expect(state.get('editDialogIsOpen')).toBe(false)
    })

    it('handles TRANSACTIONS__CREATE with + amount', () => {
        const id = stateForTransactions.getIn(['results', 0])
        const test = reducer(stateForTransactions, transactionsActions.createTransaction({
            account_id: id,
            amount: 123
        }))

        expect(test.getIn(['entities', id, 'balance'])).toBe(423.47)
    })

    it('handles TRANSACTIONS__CREATE with - amount', () => {
        const id = stateForTransactions.getIn(['results', 0])
        const test = reducer(stateForTransactions, transactionsActions.createTransaction({
            account_id: id,
            amount: -1.48
        }))

        expect(test.getIn(['entities', id, 'balance'])).toBe(298.99)
    })

    it('handles TRANSACTIONS__UPDATE', () => {
        const id = stateForTransactions.getIn(['results', 0])
        const test = reducer(stateForTransactions, transactionsActions.updateTransaction('some_id', {
            account_id: id,
            amount: 100
        }))

        expect(test.getIn(['entities', id, 'balance'])).toBe(400.47)
    })

    it('handles TRANSACTIONS__DELETE with - amount', () => {
        const id = stateForTransactions.getIn(['results', 0])
        const test = reducer(stateForTransactions, transactionsActions.deleteTransaction('some_id', {
            account_id: id,
            amount: -100.53
        }))

        expect(test.getIn(['entities', id, 'balance'])).toBe(401)
    })

    it('handles TRANSACTIONS__DELETE with + amount', () => {
        const id = stateForTransactions.getIn(['results', 0])
        const test = reducer(stateForTransactions, transactionsActions.deleteTransaction('some_id', {
            account_id: id,
            amount: 100
        }))

        expect(
            parseInt(test.getIn(['entities', id, 'balance']), 10)
        ).toBe(200)
    })

    it('does nothing when account_id isn\'t present', () => {
        const id = stateForTransactions.getIn(['results', 0])
        const test = reducer(stateForTransactions, transactionsActions.updateTransaction('some_id', {
            xaccount_id: id,
            amount: 100
        }))

        expect(test.getIn(['entities', id, 'balance'])).toBe(300.47)
    })

    it('does nothing when amount isn\'t present', () => {
        const id = stateForTransactions.getIn(['results', 0])
        const test = reducer(stateForTransactions, transactionsActions.updateTransaction('some_id', {
            account_id: id,
            xamount: 100
        }))

        expect(test.getIn(['entities', id, 'balance'])).toBe(300.47)
    })

})