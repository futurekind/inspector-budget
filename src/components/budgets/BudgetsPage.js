import React, { Component } from 'react'
import styled from 'styled-components';

import { createPageHandler } from '../common/Page';

const View = styled.div`
`

class BudgetsPage extends Component {
    render () {
        return (
            <View><h1>Budgets</h1></View>
        )
    }
}

export default createPageHandler(BudgetsPage, {
    navIndex: 1
})