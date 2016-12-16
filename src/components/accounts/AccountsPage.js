import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createPageHandler } from '../common/Page';
import styled from 'styled-components';
import Sidebar from '../common/Sidebar'

const View = styled.div`
`

class AccountsPage extends Component {
    render () {
        return (
            <h1>Accounts</h1>
        )
    }
}

const mapState = state => {
    return {}
}

export default createPageHandler(
    connect(mapState)(AccountsPage), {
    navIndex: 0
})