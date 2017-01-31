import * as selectors from '../categories';
import { Map, List } from 'immutable';

describe('Categories Selectors', () => {

    const state = {
        categories: Map({
            results: List(['id1', 'id2']),
            entities: Map({
                'id1': Map({
                    id: 'id1',
                    name: 'Z Cat'
                }),
                'id2': Map({
                    id: 'id2',
                    name: 'A Cat'
                })
            })
        })
    }

    describe('getCategoriesEntities()', () => {
        it('returns entities object', () => {
            expect(selectors.getCategoriesEntities(state))
                .toEqual({
                    id1: {
                        id: 'id1',
                        name: 'Z Cat'
                    },
                    id2: {
                        id: 'id2',
                        name: 'A Cat'
                    }
                })
        })

        it('returns sorted results', () => {
            expect(selectors.getCategories(state))
                .toEqual([
                    'id2', 'id1'
                ])
        })
    })

})