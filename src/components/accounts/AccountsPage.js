import React, { Component } from 'react'
import { createPageHandler } from '../common/Page';

class AccountsPage extends Component {
    render () {
        return (
            <h1>Accounts</h1>
        )
    }
}

export default createPageHandler(AccountsPage, {
    navIndex: 0
})