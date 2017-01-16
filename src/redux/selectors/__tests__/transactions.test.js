import { Map, List } from 'immutable';
import * as selectors from '../transactions';

describe('Transactions Selectors', () => {

    const state = {
        transactions: Map({
            results: List(['t01', 't02', 't03']),
            entities: Map({
                t01: Map({
                    id: 't01',
                    name: 'Transaktion 1',
                    createdAt: '2017-01-13T23:45:26.504Z',
                    account_id: 'acc2'
                }),
                t02: Map({
                    id: 't02',
                    name: 'Transaktion 2',
                    createdAt: '2017-01-12T18:45:26.504Z',
                    account_id: 'acc1'
                }),
                t03: Map({
                    id: 't03',
                    name: 'Transaktion 3',
                    createdAt: '2017-01-16T18:45:26.504Z',
                    account_id: 'acc1'
                })
            })
        }),
        accounts: Map({
            results: List(['acc1', 'acc2']),
            entities: Map({
                acc1: Map({
                    id: 'acc1',
                    createdAt: '2017-01-02T18:45:26.504Z'
                }),
                acc2: Map({
                    id: 'acc2',
                    createdAt: '2017-01-01T18:45:26.504Z'
                })
            }),
            tabIndex: 1
        })
    }

    describe('getTransactions()', () => {
        it('returns orders results array', () => {
            expect(selectors.getTransactions(state)).toEqual([
                't02', 't01', 't03'
            ])
        })
    })

    describe('getTransactionsEntities', () => {
        it('returns entities object', () => {
            expect(selectors.getTransactionsEntities(state))
                .toEqual(state.transactions.get('entities').toJS())
        })
    })

    describe('getTransactionsByAccount()', () => {
        it('returns results array', () => {
            expect(selectors.getTransactionsByAccount(state))
                .toEqual(['t02', 't03'])
        })
    })

})