export const types = {
    TRANSACTIONS__CREATE: 'TRANSACTIONS__CREATE' 
}

export const createTransaction = data => ({
    type: types.TRANSACTIONS__CREATE,
    data
})