import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';

import './index.css';
import App from './components/App';
import AccountsPage from './components/accounts/AccountsPage';
import BudgetsPage from './components/budgets/BudgetsPage';
import store from './redux/store';

render((
        <Provider store={ store }>
            <Router history={ hashHistory }>
                <Route path="/" component={ App }>
                    <Route path="accounts" component={ AccountsPage }></Route>
                    <Route path="budgets" component={ BudgetsPage }></Route>
                </Route>
            </Router>
        </Provider>
    ),
    document.getElementById('root')
)