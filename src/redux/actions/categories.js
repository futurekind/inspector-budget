import { v4 } from 'uuid'

export const types = {
    CAT__CREATE: 'CAT__CREATE',
    CAT__UPDATE: 'CAT__UPDATE',
    CAT__DELETE: 'CAT__DELETE',
}

export const create = (data) => ({
    type: types.CAT__CREATE,
    id: v4(),
    payload: data
})

export const update = (id, data) => ({
    type: types.CAT__UPDATE,
    id,
    payload: data
})

export const remove = (id) => ({
    type: types.CAT__DELETE,
    id
})