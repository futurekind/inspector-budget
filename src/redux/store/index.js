import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import { middleware as packMiddleware } from 'redux-pack';
import dropboxMiddleware from './dropboxApiMiddleware';

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify here name, actionsBlacklist, actionsCreators and other options
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(
        packMiddleware,
        thunkMiddleware,
        dropboxMiddleware
    ),
);

export default createStore(
    rootReducer,
    enhancer
);