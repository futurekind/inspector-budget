import * as actions from '../application';

describe('Application Actions', () => {

    describe('setNavIndex()', () => {
        const action = actions.setNavIndex(1);

        it('returns action', () => {
            expect(action.type)
                .toBe(actions.types.APP__SET_NAV_INDEX)
        })

        it('returns index', () => {
            expect(action.index)
                .toBe(1)
        })
    })

    describe('setDirty()', () => {
        const action = actions.setDirty()

        it('returns type', () => {
            expect(action.type)
                .toBe(actions.types.APP__SET_DIRTY)
        })
    })

    describe('setLastSave()', () => {
        const action = actions.setLastSave();

        it('returns type', () => {
            expect(action.type).toBe(actions.types.APP__SET_LAST_SAVE);
        })

        it('returns date', () => {
            const date = Date.parse(action.date);
            const isValidDate = !isNaN(date)
            
            expect(action.date).toBeDefined()
            expect(isValidDate).toBe(true)
        })

    })

    describe('saveStateToServer()', () => {
        const action = actions.saveStateToServer();

        it('returns type', () => {
            expect(action.type).toBe(actions.types.APP__SAVE_STATE_TO_SERVER)
        })
    })

})