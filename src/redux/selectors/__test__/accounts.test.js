import { Map, List } from 'immutable';
import { getAccounts, getAccountById, getCreateDialogIsOpen, getTabIndex } from '../accounts'

describe('Accounts Selectors', () => {

    const state = Map({
        results: List(['acc_1', 'acc_2', 'acc_3']),
        entities: Map({
            acc_1: Map({
                id: 'acc_1',
                name: 'Z Account',
                createdAt: '2017-01-01T22:05:53.580Z'
            }),
            acc_2: Map({
                id: 'acc_2',
                name: 'A Account',
                createdAt: '2017-01-08T22:05:53.580Z'
            }),
            acc_3: Map({
                id: 'acc_3',
                name: 'M Account',
                createdAt: '2017-01-07T22:05:53.580Z'
            })
        }),
        createDialogIsOpen: false,
        tabIndex: 1
    })

    describe('getAccounts()', () => {

        it('returns an sorted array', () => {

            const results = getAccounts({
                accounts: state
            })
            expect(results).toEqual([
                'acc_1', 'acc_3', 'acc_2'
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

    describe('getTabIndex()', () => {

        it('returns tabIndex', () => {
            expect(getTabIndex({
                accounts: state
            })).toBe(1)
        })

    })

})