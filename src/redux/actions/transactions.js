import assign from 'lodash.assign';
import uuid from 'uuid';

export const types = {
    TRANSACTIONS__CREATE: 'TRANSACTIONS__CREATE', 
    TRANSACTIONS__UPDATE: 'TRANSACTIONS__UPDATE', 
    TRANSACTIONS__DELETE: 'TRANSACTIONS__DELETE', 
}

export const createTransaction = data => ({
    type: types.TRANSACTIONS__CREATE,
    data: assign({}, data, {
        id: uuid.v4(),
        createdAt: new Date().toISOString()
    })
})

export const updateTransaction = (id, data) => ({
    type: types.TRANSACTIONS__UPDATE,
    id, data
})

export const deleteTransaction = (id, data) => ({
    type: types.TRANSACTIONS__DELETE,
    id, data
})