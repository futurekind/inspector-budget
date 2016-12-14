import React, { Component } from 'react'
import { createPageHandler } from '../common/Page';
import styled from 'styled-components';
import Sidebar from '../common/Sidebar'

const View = styled.div`
    display: flex;
    height: 100%;
`

class AccountsPage extends Component {
    render () {
        return (
            <View>
                <Sidebar />
            </View>
        )
    }
}

export default createPageHandler(AccountsPage, {
    navIndex: 0
})