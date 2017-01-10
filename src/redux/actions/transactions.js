export const types = {
    TRANSACTIONS__CREATE: 'TRANSACTIONS__CREATE', 
    TRANSACTIONS__UPDATE: 'TRANSACTIONS__UPDATE', 
    TRANSACTIONS__DELETE: 'TRANSACTIONS__DELETE', 
}

export const createTransaction = data => ({
    type: types.TRANSACTIONS__CREATE,
    data
})

export const updateTransaction = (id, data) => ({
    type: types.TRANSACTIONS__UPDATE,
    id, data
})

export const deleteTransaction = id => ({
    type: types.TRANSACTIONS__DELETE,
    id
})