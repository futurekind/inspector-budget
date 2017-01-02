import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createPageHandler } from '../common/Page';
import styled from 'styled-components';

import PageHeading from '../common/PageHeading';
import Divider from '../common/Divider';
import Button from '../common/Button';

const View = styled.section`
    width: 100%;
    height: 100%;
`;

const Header = styled.header`
    flex-basis: 100%;
    display: flex;
    align-items: flex-end;
`;

const TitleCol = styled.div`
    flex: 1;
`

const ActionsCol = styled.div``

class AccountsPage extends Component {
    render () {
        return (
            <View>
                <Header>
                    <TitleCol>
                        <PageHeading>Accounts</PageHeading>
                    </TitleCol>
                    <ActionsCol>
                        <Button>Create new Account</Button>
                    </ActionsCol>
                </Header>
                <Divider type="light" />
                <Button type="plain">Create new Account</Button>
                <Button type="primary">Create new Account</Button>
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