export const APP__SET_NAV_INDEX = 'APP__SET_NAV_INDEX';

export const setNavIndex = (index = -1) => ({
    type: APP__SET_NAV_INDEX,
    index
})