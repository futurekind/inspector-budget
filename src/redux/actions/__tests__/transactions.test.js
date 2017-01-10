import * as actions from '../transactions';

describe('createTransaction()', () => {

    it('returns action', () => {
        expect(actions.createTransaction({
            foo: 'bar'
        })).toEqual({
            type: actions.types.TRANSACTIONS__CREATE,
            data: {
                foo: 'bar'
            }
        })
    })

})