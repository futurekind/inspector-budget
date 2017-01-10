import { types as accountActionTypes } from '../actions/accounts';
import { getAccessToken } from '../../utils/dropbox';
import fetch from 'isomorphic-fetch';

const API_URL = 'https://content.dropboxapi.com/1/files_put/auto';

const serializeState = state => {
    let stateToSerialize = {
        accounts: {
            results: state.accounts.get('results').toJS(),
            entities: state.accounts.get('entities').toJS()
        }
    }

    return JSON.stringify(stateToSerialize);
}

const saveToDropbox = data => {
    fetch(`${API_URL}/data.json`, {
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
        case accountActionTypes.ACCOUNT__CREATE:
        case accountActionTypes.ACCOUNT__UPDATE:
            saveToDropbox(serializeState(store.getState()));
            break;
        default:
    }

    return result;
}