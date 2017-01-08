import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import URL from 'urijs';

import './index.css';
import App from './components/App';
import AccountsPage from './components/accounts/AccountsPage';
import BudgetsPage from './components/budgets/BudgetsPage';
import store from './redux/store';

import { shouldGetAccessToken, authorize, getAccessTokenInHashFragment, setAccessToken } from './utils/dropbox';

const url = new URL();
const hashFragment = url.fragment();
const accessTokenFromHash = getAccessTokenInHashFragment(hashFragment)

if(accessTokenFromHash) {
    setAccessToken(accessTokenFromHash)
    window.location.href = `${url.protocol()}://${url.host()}`
}
if(shouldGetAccessToken()) {
    authorize();
} else {
    render((
            <Provider store={ store }>
                <Router history={ hashHistory }>
                    <Route path="/" component={ App }>
                        <IndexRoute component={ AccountsPage } />
                        <Route path="accounts" component={ AccountsPage }></Route>
                        <Route path="budgets" component={ BudgetsPage }></Route>
                    </Route>
                </Router>
            </Provider>
        ),
        document.getElementById('root')
    )
}