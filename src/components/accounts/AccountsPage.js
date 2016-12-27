import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createPageHandler } from '../common/Page';
import styled from 'styled-components';

import PageHeading from '../common/PageHeading';
import Divider from '../common/Divider';

const View = styled.section`
    width: 100%;
    height: 100%;
`;

const Header = styled.header`
    flex-basis: 100%;
`;

class AccountsPage extends Component {
    render () {
        return (
            <View>
                <Header>
                    <PageHeading>Accounts</PageHeading>
                    <Divider type="light" />
                </Header>
            </View>
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