import assign from 'lodash.assign';
import uuid from 'uuid';

export const types = {
    ACCOUNT__CREATE: 'ACCOUNT__CREATE',
    ACCOUNT__UPDATE: 'ACCOUNT__UPDATE',
    ACCOUNT__DELETE: 'ACCOUNT__DELETE',
    ACCOUNT__CREATE_DIALOG_OPEN: 'ACCOUNT__CREATE_DIALOG_OPEN'
}

export const createAccount = (data) => ({
    type: types.ACCOUNT__CREATE,
    data: assign({}, data, {
        id: uuid.v4(),
        createdAt: new Date().toISOString()
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

export const toggleCreateDialog = () => ({
    type: types.ACCOUNT__CREATE_DIALOG_OPEN
})