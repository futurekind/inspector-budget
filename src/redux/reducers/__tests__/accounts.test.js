import reducer, { initialState } from '../accounts';
import * as actions from '../../actions/accounts';
import * as transactionsActions from '../../actions/transactions';

describe('Accounts Reducer', () => {

    let state, acc1, acc2;
    
    const d = jest.fn();

    actions.createAccount({
        name: 'Testaccount', balance: 300.47
    })(d)

    const stateForTransactions = reducer(undefined, d.mock.calls[0][0])

    it('returns a funtcion', () => {
        expect(typeof reducer).toBe('function');
    })

    it('returns the initial state', () => {
        const state = reducer(undefined, 'SOME_ACTION_TYPE');

        expect(state).toBe(initialState);
    })

    it('creates a new account', () => {
        const { createAccount } = actions;
        const dispatch = jest.fn();

        createAccount({
            name: 'Some new account',
            balance: 0.00,
        })(dispatch)

        createAccount({
            name: 'Anther new account',
            balance: 987.65,
        })(dispatch)

        state = reducer(undefined, dispatch.mock.calls[0][0])
        state = reducer(state, dispatch.mock.calls[2][0])

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
        const dispatch = jest.fn();

        updateAccount(acc1.get('id'), {
            name: 'another name',
            foo: 'bar'
        })(dispatch)
        
        state = reducer(state, dispatch.mock.calls[0][0])

        const account = state.getIn(['entities', acc1.get('id')]).toJS();

        expect(state.get('results').size).toBe(2);
        expect(account.name).toBe('another name')
        expect(account.balance).toBe(0.00)
        expect(account.foo).toBe('bar')

    })

    it('deletes an account', () => {
        const { deleteAccount } = actions;
        const dispatch = jest.fn();

        deleteAccount(acc1.get('id'))(dispatch);

        state = reducer(state, dispatch.mock.calls[0][0])

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
            amount: -100,
            prev_amount: 100
        }))

        expect(
            parseInt(test.getIn(['entities', id, 'balance']), 10)
        ).toBe(100)
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

})