import { Map, List } from 'immutable';
import { getAccounts, getAccountById, getCreateDialogIsOpen } from '../accounts'

describe('Accounts Selectors', () => {

    const state = Map({
        results: List(['acc_1', 'acc_2', 'acc_3']),
        entities: Map({
            acc_1: Map({
                id: 'acc_1',
                name: 'Z Account'
            }),
            acc_2: Map({
                id: 'acc_2',
                name: 'A Account'
            }),
            acc_3: Map({
                id: 'acc_3',
                name: 'M Account'
            })
        }),
        createDialogIsOpen: false
    })

    describe('getAccounts()', () => {

        it('returns an sorted array', () => {

            const results = getAccounts({
                accounts: state
            })
            expect(results).toEqual([
                'acc_2', 'acc_3', 'acc_1'
            ])

        })

    })

    describe('getAccountById()', () => {
        it('returns an object', () => {
            const account = getAccountById({
                accounts: state
            }, 'acc_2')
            
            expect(account.name).toBe('A Account');
        })
    })

    describe('getCreateDialogIsOpen()', () => {
        it('returns current toggle state', () => {
            const open = getCreateDialogIsOpen({
                accounts: state
            })

            expect(open).toBe(false)
        })
    })

})