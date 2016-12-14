import React, { Component } from 'react'
import { createPageHandler } from '../common/Page';
import styled from 'styled-components';

const View = styled.div`
    
`

class AccountsPage extends Component {
    render () {
        return (
            <View><h1>Budgets</h1></View>
        )
    }
}

export default createPageHandler(AccountsPage, {
    navIndex: 0
})