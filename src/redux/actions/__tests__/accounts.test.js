import * as actions from '../accounts';
import * as fromApp from '../application';

describe('Account Actions', () => {

    describe('createAccount()', () => {

        const fakeDispatch = jest.fn();

        const action = actions.createAccount({
            name: 'some name',
        })(fakeDispatch)

        it('is a function', () => {
            expect(typeof actions.createAccount).toBe('function')
        })

        it('returns function called with ACCOUNT__CREATE', () => {
            const call = fakeDispatch.mock.calls[0]

            expect(call[0].type).toBe(actions.types.ACCOUNT__CREATE)
            expect(call[0].data).toBeDefined()
            expect(call[0].data.id).toBeDefined()
            expect(call[0].data.createdAt).toBeDefined()
        })

        it('returns function called with ACCOUNT__CREATE', () => {
            const call = fakeDispatch.mock.calls[1]
            expect(call[0].type).toBe(fromApp.types.APP__SET_DIRTY)
        })

    })

    describe('updateAccount()', () => {
        const fakeDispatch = jest.fn();

        actions.updateAccount('some_id', {
            foo: 'bar',
            baz: 'boo'
        })(fakeDispatch)
        
        it('is a function', () => {
            expect(typeof actions.updateAccount).toBe('function');
        })

        it(`returns function calles with ${actions.types.ACCOUNT__UPDATE}`, () => {
            
            const call = fakeDispatch.mock.calls[0];

            expect(call[0].type).toBe(actions.types.ACCOUNT__UPDATE)
            expect(call[0].id).toBe('some_id')
            expect(call[0].data).toEqual({
                foo: 'bar',
                baz: 'boo'
            })
        })

        it(`returns function calles with ${fromApp.types.APP__SET_DIRTY}`, () => {
            const call = fakeDispatch.mock.calls[1];
            expect(call[0].type).toBe(fromApp.types.APP__SET_DIRTY)
        })
    })

    describe('deleteAccount()', () => {
        const fakeDispatch = jest.fn();
        const action = actions.deleteAccount('some_id')(fakeDispatch);

        it(`returns function called with ${actions.types.ACCOUNT__DELETE}`, () => {
            const call = fakeDispatch.mock.calls[0];
            expect(call[0].type).toBe(actions.types.ACCOUNT__DELETE);
            expect(call[0].id).toBe('some_id');
        })

        it(`returns function called with ${fromApp.types.APP__SET_DIRTY}`, () => {
            const call = fakeDispatch.mock.calls[1];
            expect(call[0].type).toBe(fromApp.types.APP__SET_DIRTY);
        })

    })

    describe('toggleCreateDialog()', () => {
        
        it('is a function', () => {
            expect(typeof actions.toggleCreateDialog).toBe('function')
        })

        it('returns an action', () => {
            expect(actions.toggleCreateDialog().type).toBe(actions.types.ACCOUNT__CREATE_DIALOG_OPEN)
        })
    })

    describe('setTabIndex()', () => {
        it('returns an action', () => {
            const action = actions.setTabIndex(2);

            expect(action.type).toBe(actions.types.ACCOUNT__SET_TAB_INDEX);
            expect(action.index).toBe(2);
        })
    })

    describe('toggleEditDialog()', () => {
        it('returns an action', () => {
            expect(actions.toggleEditDialog().type).toBe(actions.types.ACCOUNT__EDIT_DIALOG_OPEN)
        })
    })

})