import { Map, List } from 'immutable';
import * as selectors from '../transactions';

describe('Transactions Selectors', () => {

    const state = {
        transactions: Map({
            results: List(['t01', 't02']),
            entities: Map({
                t01: Map({
                    id: 't01',
                    name: 'Transaktion 1',
                    createdAt: '2017-01-13T23:45:26.504Z'
                }),
                t02: Map({
                    id: 't02',
                    name: 'Transaktion 2',
                    createdAt: '2017-01-12T18:45:26.504Z'
                })
            })
        })
    }

    describe('getTransactions()', () => {
        it('returns orders results array', () => {
            expect(selectors.getTransactions(state)).toEqual([
                't02', 't01'
            ])
        })
    })

    describe('getTransactionsEntities', () => {
        it('returns entities object', () => {
            expect(selectors.getTransactionsEntities(state))
                .toEqual(state.transactions.get('entities').toJS())
        })
    })

})