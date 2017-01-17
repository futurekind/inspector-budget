import assign from 'lodash.assign';
import uuid from 'uuid';

export const types = {
    TRANSACTIONS__CREATE: 'TRANSACTIONS__CREATE', 
    TRANSACTIONS__UPDATE: 'TRANSACTIONS__UPDATE', 
    TRANSACTIONS__DELETE: 'TRANSACTIONS__DELETE',
    TRANSACTIONS__TOGGLE_DIALOG: 'TRANSACTIONS__TOGGLE_DIALOG'
}

export const createTransaction = data => {
    if(!data.amount || !data.account_id) throw new Error('Please provide `account_id` and `amount` in the data object');

    return {
        type: types.TRANSACTIONS__CREATE,
        data: assign({}, data, {
            id: uuid.v4(),
            createdAt: new Date().toISOString()
        })
    }
}

export const updateTransaction = (id, data) => {
    if(!data.amount || !data.prev_amount || !data.account_id) throw new Error('Please provide `account_id`, `amount` and `prev_amount` in the data object');

    return {
        type: types.TRANSACTIONS__UPDATE,
        id, data
    }
}

export const deleteTransaction = (id, data) => {
    if(!data.amount || !data.account_id) throw new Error('Please provide `account_id` and `amount` in the data object');

    return {
        type: types.TRANSACTIONS__DELETE,
        id, data
    }
}

export const toggleDialog = () => ({
    type: types.TRANSACTIONS__TOGGLE_DIALOG
})