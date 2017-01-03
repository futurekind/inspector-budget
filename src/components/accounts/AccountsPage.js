import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createPageHandler } from '../common/Page';
import styled from 'styled-components';

import PageHeading from '../common/PageHeading';
import Divider from '../common/Divider';
import Button from '../common/Button';
import Dialog from '../common/Dialog';
import { Grid, GridCol } from '../common/Grid';

import { toggleCreateDialog } from '../../redux/actions/accounts';
import { getCreateDialogIsOpen } from '../../redux/selectors/accounts'

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

        this.handleClickCreateAccount = this.handleClickCreateAccount.bind(this)
        this.handleRequestCloseDialog = this.handleRequestCloseDialog.bind(this)
    }

    render () {
        const { createDialogOpen } = this.props;

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
                    open={ createDialogOpen }
                    onRequestClose={ this.handleRequestCloseDialog }
                    title="Create new Account"
                >
                    <Grid>
                        <GridCol>Grid 1</GridCol>
                        <GridCol>Grid 2</GridCol>
                        <GridCol>Grid 3</GridCol>
                        <GridCol>Grid 4</GridCol>
                        <GridCol>Grid 5</GridCol>
                        <GridCol>Grid 6</GridCol>
                        <GridCol>Grid 7</GridCol>
                    </Grid>
                </Dialog>
            </View>
        )
    }

    handleClickCreateAccount() {
        const { dispatch } = this.props;
        dispatch(toggleCreateDialog());
    }

    handleRequestCloseDialog() {
        const { dispatch } = this.props;
        dispatch(toggleCreateDialog());
    }
}

const mapState = state => {
    return {
        createDialogOpen: getCreateDialogIsOpen(state)
    }
}

export default createPageHandler(
    connect(mapState)(AccountsPage), {
    navIndex: 0
})