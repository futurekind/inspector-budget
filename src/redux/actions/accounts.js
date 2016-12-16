import assign from 'lodash.assign';
import unique from 'lodash.uniqueid';

export const types = {
    ACCOUNT__CREATE: 'ACCOUNT__CREATE',
    ACCOUNT__UPDATE: 'ACCOUNT__UPDATE',
    ACCOUNT__DELETE: 'ACCOUNT__DELETE',
}

export const createAccount = (data) => ({
    type: types.ACCOUNT__CREATE,
    data: assign({}, data, {
        id: unique('account_')
    })
})

export const updateAccount = (id = '', data = {}) => ({
    type: types.ACCOUNT__UPDATE,
    id,
    data
})

export const deleteAccount = id => ({
    type: types.ACCOUNT__DELETE,
    id
})