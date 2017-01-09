import * as actions from '../accounts';

describe('Account Actions', () => {

    describe('createAccount()', () => {

        it('is a function', () => {
            expect(typeof actions.createAccount).toBe('function')
        })

        it('returns object', () => {
            const action = actions.createAccount({
                name: 'some name',
            })

            expect(action.type).toBe(actions.types.ACCOUNT__CREATE)
            expect(action.data.name).toBe('some name');
            expect(action.data.id).toBeDefined();
        })

    })

    describe('updateAccount()', () => {
        it('is a function', () => {
            expect(typeof actions.updateAccount).toBe('function');
        })

        it('returns an action', () => {
            const action = actions.updateAccount('some_id', {
                foo: 'bar',
                baz: 'boo'
            })

            expect(action.type).toBe(actions.types.ACCOUNT__UPDATE)
            expect(action.id).toBe('some_id')
            expect(action.data).toEqual({
                foo: 'bar',
                baz: 'boo'
            })
        })
    })

    describe('deleteAccount()', () => {

        it('returns an action', () => {
            const action = actions.deleteAccount('some_id');
            expect(action.type).toBe(actions.types.ACCOUNT__DELETE);
            expect(action.id).toBe('some_id');
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

})