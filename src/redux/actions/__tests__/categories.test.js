import * as actions from '../categories';

describe('Categories actions', () => {

    describe('create()', () => {
        const action = actions.create({
            name: 'Foo'
        })

        it('returns action type', () => {
            expect(action.type).toBe(actions.types.CAT__CREATE)
        })

        it('has an id', () => {
            expect(action.id).toBeDefined()
        })

        it('returns its payload', () => {
            expect(action.payload).toEqual({
                name: 'Foo'
            })
        })
    })

    describe('update()', () => {
        const action = actions.update('some id', {
            name: 'Bar'
        })

        it('returns action type', () => {
            expect(action.type).toBe(actions.types.CAT__UPDATE)
        })

        it('returns given id', () => {
            expect(action.id).toBe('some id')
        })

        it('returns its payload', () => {
            expect(action.payload).toEqual({
                name: 'Bar'
            })
        })
    })

    describe('remove()', () => {
        const action = actions.remove('some id')

        it('returns action type', () => {
            expect(action.type).toBe(actions.types.CAT__DELETE)
        })

        it('returns given id', () => {
            expect(action.id).toBe('some id')
        })
    })

})