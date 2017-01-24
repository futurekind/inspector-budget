import * as appActions from '../actions/application';
import { getAccessToken } from '../../utils/dropbox';
import fetch from 'isomorphic-fetch';

const API_URL = 'https://content.dropboxapi.com/1/files_put/auto';

const serializeState = state => {
    let stateToSerialize = state;

    return JSON.stringify(stateToSerialize);
}

const saveToDropbox = data => {
    return fetch(`${API_URL}/data.json`, {
        method: 'PUT',
        body: data,
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        }
    })
}

export default store => next => action => {
    const result = next(action);
    
    switch(action.type) {
        case appActions.types.APP__SAVE_STATE_TO_SERVER:
            saveToDropbox(serializeState(store.getState()))
                .then(() => {
                    store.dispatch(appActions.setLastSave())
                })
            break;
        default:
    }

    return result;
}