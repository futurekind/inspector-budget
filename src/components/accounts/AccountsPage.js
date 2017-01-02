import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createPageHandler } from '../common/Page';
import styled from 'styled-components';

import PageHeading from '../common/PageHeading';
import Divider from '../common/Divider';
import Button from '../common/Button';
import Dialog from '../common/Dialog';

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
    
    constructor(props) {
        super(props);

        this.state = {
            dialogOpen: false
        }

        this.handleClickCreateAccount = this.handleClickCreateAccount.bind(this)
        this.handleRequestCloseDialog = this.handleRequestCloseDialog.bind(this)
    }

    render () {
        return (
            <View>
                <Header>
                    <TitleCol>
                        <PageHeading>Accounts</PageHeading>
                    </TitleCol>
                    <ActionsCol>
                        <Button 
                            onClick={ this.handleClickCreateAccount }
                            icon="add_circle" 
                            type="plain"
                        >
                            Create new Account
                        </Button>
                    </ActionsCol>
                </Header>
                <Divider type="light" />
                <Dialog 
                    open={ this.state.dialogOpen }
                    onRequestClose={ this.handleRequestCloseDialog }
                ></Dialog>
            </View>
        )
    }

    handleClickCreateAccount() {
        this.setState({
            dialogOpen: true
        })
    }

    handleRequestCloseDialog() {
        this.setState({
            dialogOpen: false
        })
    }
}

const mapState = state => {
    return {}
}

export default createPageHandler(
    connect(mapState)(AccountsPage), {
    navIndex: 0
})