import { shouldGetAccessToken, getAccessTokenInHashFragment } from '../dropbox'

const localStorageMock = () => {
    let data = {};

    const getItem = key => data[key]
    const setItem = (key, value) => data[key] = value

    return {
        getItem,
        setItem
    }
}

describe('Dropbox', () => {

    global.localStorage = localStorageMock();

    describe('shouldGetAccessToken()', () => {

        it('returns true when no access token is present in localStorage', () => {
            expect(shouldGetAccessToken()).toBe(true)
        })

        it('returns true when access token is present in localStorage', () => {
            global.localStorage.setItem('IB_AT', 'foo');
            expect(shouldGetAccessToken()).toBe(false)
        })

    })

    describe('getAccessTokenInHashFragment()', () => {
        it('returns false when no token is found', () => {
            const hashStr = 'foo=bar&bee=baz&zee=faz'
            expect(getAccessTokenInHashFragment(hashStr)).toBe(false)
        })

        it('returns token when token is found', () => {
            const hashStr = 'access_token=abc1234&token_type=bearer&uid=259666&account_id=dbid%3AAACKRsZdLxiw9MkMGO-4UZezTGMfK4KpA1c'
            expect(getAccessTokenInHashFragment(hashStr)).toBe('abc1234')
        })
    })

})