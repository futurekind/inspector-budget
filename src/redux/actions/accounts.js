import assign from 'lodash.assign';
import uuid from 'uuid';
import * as fromApplication from './application';

export const types = {
    ACCOUNT__CREATE: 'ACCOUNT__CREATE',
    ACCOUNT__UPDATE: 'ACCOUNT__UPDATE',
    ACCOUNT__DELETE: 'ACCOUNT__DELETE',
    ACCOUNT__CREATE_DIALOG_OPEN: 'ACCOUNT__CREATE_DIALOG_OPEN',
    ACCOUNT__EDIT_DIALOG_OPEN: 'ACCOUNT__EDIT_DIALOG_OPEN',
    ACCOUNT__SET_TAB_INDEX: 'ACCOUNT__SET_TAB_INDEX'
}

export const createAccount = (data) => dispatch => {
    dispatch({
        type: types.ACCOUNT__CREATE,
        data: assign({}, data, {
            id: uuid.v4(),
            createdAt: new Date().toISOString()
        })
    })

    dispatch(fromApplication.setDirty())
}

export const updateAccount = (id = '', data = {}) => dispatch => {
    dispatch({
        type: types.ACCOUNT__UPDATE,
        id,
        data
    })

    dispatch(fromApplication.setDirty())
}

export const deleteAccount = id => dispatch => {
    dispatch({
        type: types.ACCOUNT__DELETE,
        id
    })

    dispatch(fromApplication.setDirty())
}

export const toggleCreateDialog = () => ({
    type: types.ACCOUNT__CREATE_DIALOG_OPEN
})

export const setTabIndex = index => ({
    type: types.ACCOUNT__SET_TAB_INDEX,
    index
})

export const toggleEditDialog = () => ({
    type: types.ACCOUNT__EDIT_DIALOG_OPEN
})