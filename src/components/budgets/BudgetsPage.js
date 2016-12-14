import React, { Component } from 'react'
import { createPageHandler } from '../common/Page';

class BudgetsPage extends Component {
    render () {
        return (
            <h1>Budgets</h1>
        )
    }
}

export default createPageHandler(BudgetsPage, {
    navIndex: 1
})