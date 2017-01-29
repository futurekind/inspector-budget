import * as selectors from '../application';
import { Map } from 'immutable'; 

describe('Application Selectors', () => {

    const state = {
        application: Map({
          selectedNavIndex: 5,
          dirty: 0,
          lastSave: 'foo'
        })
    }

    describe('getNavIndex()', () => {
        const { getNavIndex } = selectors;

        it('is defined', () => {
            expect(typeof getNavIndex).toBe('function');
        })

        it('returns the expected value', () => {
            expect(getNavIndex(state)).toBe(5)
        })

    })

    describe('getDirty', () => {
        it('returns', () => {
            expect(selectors.getDirty(state)).toBe(0)
        })
    })

    describe('getLastSave', () => {
        it('returns', () => {
            expect(selectors.getLastSave(state)).toBe('foo')
        })
    })

})