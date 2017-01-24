export const types = {
    APP__SET_NAV_INDEX: 'APP__SET_NAV_INDEX',
    APP__SET_DIRTY: 'APP__SET_DIRTY',
    APP__SET_LAST_SAVE: 'APP__SET_LAST_SAVE',
}

export const setNavIndex = (index = -1) => ({
    type: types.APP__SET_NAV_INDEX,
    index
})

export const setDirty = () => ({
    type: types.APP__SET_DIRTY
})

export const setLastSave = () => ({
    type: types.APP__SET_LAST_SAVE,
    date: new Date().toISOString()
})