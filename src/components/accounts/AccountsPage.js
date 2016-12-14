import React, { Component } from 'react'
import { createPageHandler } from '../common/Page';
import styled from 'styled-components';
import Sidebar from '../common/Sidebar'

const View = styled.div`
`

class AccountsPage extends Component {
    render () {
        return (
            <View>
                <h2>Sidebar</h2>
            </View>
        )
    }
}

export default createPageHandler(AccountsPage, {
    navIndex: 0,
    sidebar: Sidebar
})