import * as selectors from './application';
import { Map } from 'immutable'; 

describe('Application Selectors', () => {

    const state = Map({
        selectedNavIndex: 5
    })

    describe('getNavIndex()', () => {
        const { getNavIndex } = selectors;

        it('is defined', () => {
            expect(typeof getNavIndex).toBe('function');
        })

        it('returns the expected value', () => {
            expect(getNavIndex(state)).toBe(5)
        })

    })

})