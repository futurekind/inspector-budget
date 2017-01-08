import fetch from 'isomorphic-fetch';
import { getAccessToken } from '../../utils/dropbox';
const LOAD_URL = 'https://content.dropboxapi.com/1/files/auto'

export const types = {
    API__LOAD: 'API__LOAD'
};

export const load = () => ({
    type: types.API__LOAD,
    promise: fetch(`${LOAD_URL}/data.json`, {
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        }
    }).then(resp => resp.text())
})