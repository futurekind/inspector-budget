import reducer, { initialState } from '../categories';
import * as actions from '../../actions/categories';

describe('Categories Reducer', () => {
    let state;

    it('returns initial state', () => {
        state = reducer(undefined, {
            type: 'some action'
        })

        expect(state).toEqual(initialState)
    })


    describe('CAT__CREATE', () => {
        beforeAll(() => {
            state = reducer(state, actions.create({
                name: 'Cat 1'
            }))

            state = reducer(state, actions.create({
                name: 'Cat 2'
            }))
        })
        
        it('sets results', () => {
            expect(state.get('results').size).toBe(2)
        })

        it('sets entities', () => {
            expect(state.get('entities').size).toBe(2)
        })

        it('has expected entities', () => {
            const cat1 = state.getIn(['entities', state.getIn(['results', 0])])
            const cat2 = state.getIn(['entities', state.getIn(['results', 1])])
            
            expect(cat1.get('name')).toBe('Cat 1')
            expect(cat1.get('id')).toBeDefined()
            expect(cat2.get('name')).toBe('Cat 2')
            expect(cat2.get('id')).toBeDefined()
        })
    })

    describe('CAT__UPDATE', () => {
        let id;

        beforeAll(() => {
            id = state.getIn(['results', 1])
            state = reducer(state, actions.update(id, {
                name: 'New Cat 2',
                foo: 'bar'
            }))

        })

        it('updates correctly', () => {
            expect(state.getIn([
                'entities', id, 'name'
            ])).toBe('New Cat 2')

            expect(state.getIn([
                'entities', id, 'foo'
            ])).toBe('bar')
        })

    })

    describe('CAT__DELETE', () => {
        let id;

        beforeAll(() => {
            id = state.getIn(['results', 0])
            state = reducer(state, actions.remove(id))

        })

        it('removes result', () => {
            expect(state.get('results').size).toBe(1)
            expect(state.get('results').toJS()).not.toContain(id)
        })

        it('removes entity', () => {
            expect(state.getIn(['entities', id])).not.toBeDefined()
        })

    })

})