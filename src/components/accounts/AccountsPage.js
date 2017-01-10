import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createPageHandler } from '../common/Page';
import styled from 'styled-components';
import assign from 'lodash.assign';

import PageHeading from '../common/PageHeading';
import Divider from '../common/Divider';
import Button from '../common/Button';
import Dialog from '../common/Dialog';
import Spacer from '../common/Spacer';
import Input from '../common/Input';
import { Grid, GridCol } from '../common/Grid';
import { Tabs, Tab } from '../common/Tabs';

import { toggleCreateDialog, createAccount, setTabIndex } from '../../redux/actions/accounts';
import { getCreateDialogIsOpen, getAccounts, getAccountById, getTabIndex } from '../../redux/selectors/accounts'

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
            form: {}
        }

        this.handleClickCreateAccount = this.handleClickCreateAccount.bind(this)
        this.handleRequestCloseDialog = this.handleRequestCloseDialog.bind(this)
        this.handleCreateAccount = this.handleCreateAccount.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleTabClick = this.handleTabClick.bind(this)
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

                
                { this.renderTabs() }
                { this.renderNoAccounts() }

                <Dialog 
                    open={ createDialogOpen }
                    modal
                    onRequestClose={ this.handleRequestCloseDialog }
                    title="Create new Account"
                >
                    <Grid>
                        <GridCol>
                            <Input
                                name="name"
                                label="Name"
                                value={ this.state.form.name || '' }
                                onChange={ this.handleInputChange }
                            />
                        </GridCol>
                        <GridCol>
                            <Input
                                name="balance"
                                label="Current balance"
                                type="number"
                                value={ this.state.form.balance || '' }
                                onChange={ this.handleInputChange }
                            />
                        </GridCol>
                    </Grid>
                    <Spacer value={1}>
                        <Button type="plain" onClick={ this.handleRequestCloseDialog }>Cancel</Button>
                        <Button 
                            type="primary" 
                            onClick={ this.handleCreateAccount }
                            disabled={
                                !this.state.form.name || !this.state.form.balance
                            }
                        >Create Account</Button>
                    </Spacer>
                </Dialog>
            </View>
        )
    }

    renderNoAccounts() {
        const { accounts } = this.props;

        if(accounts.length === 0) {
            return (
                <Spacer value={ 1 }>
                    <p>You have no accounts.</p>
                    <p><Button onClick={ this.handleClickCreateAccount }>Add account</Button></p>
                </Spacer>
            )
        }
    }

    renderTabs() {
        const { accounts, tabIndex } = this.props;

        if(accounts.length === 0) return null;
        
        return (
            <Tabs selectedIndex={ tabIndex } onItemClick={ this.handleTabClick }>
                { accounts.map(account => (
                    <Tab key={ account.id }>{ account.name }</Tab>
                )) }
            </Tabs>
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

    handleInputChange(e) {
        const { name, value } = e.target;

        this.setState({
            form: assign({}, this.state.form, {
                [name]: value
            })
        })
    }

    handleCreateAccount() {
        const { dispatch } = this.props;
        const { form } = this.state;

        dispatch(createAccount(form));
        dispatch(toggleCreateDialog());

        this.setState({
            form: {}
        })
    }

    handleTabClick(index) {
        const { dispatch } = this.props;
        dispatch(setTabIndex(index));
    }
}

const mapState = state => {
    return {
        createDialogOpen: getCreateDialogIsOpen(state),
        accounts: getAccounts(state).map(id => getAccountById(state, id)),
        tabIndex: getTabIndex(state)
    }
}

export default createPageHandler(
    connect(mapState)(AccountsPage), {
    navIndex: 0
})