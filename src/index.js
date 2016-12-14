import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';

import './index.css';
import App from './components/App';
import store from './redux/store';

render((
        <Provider store={ store }>
            <Router history={ hashHistory }>
                <Route path="/" component={ App }></Route>
            </Router>
        </Provider>
    ),
    document.getElementById('root')
)