export const types = {
    TRANSACTIONS__CREATE: 'TRANSACTIONS__CREATE', 
    TRANSACTIONS__UPDATE: 'TRANSACTIONS__UPDATE', 
}

export const createTransaction = data => ({
    type: types.TRANSACTIONS__CREATE,
    data
})

export const updateTransaction = (id, data) => ({
    type: types.TRANSACTIONS__UPDATE,
    id, data
})