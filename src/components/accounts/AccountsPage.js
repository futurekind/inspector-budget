import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createPageHandler } from '../common/Page';
import styled from 'styled-components';

import PageHeading from '../common/PageHeading'


class AccountsPage extends Component {
    render () {
        return (
            <PageHeading>Accounts</PageHeading>
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