import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createPageHandler } from '../common/Page';
import styled from 'styled-components';
import assign from 'lodash.assign';

import PageHeading from '../common/PageHeading';
import Divider from '../common/Divider';
import Button from '../common/Button';
import Dialog from '../common/Dialog';
import Input from '../common/Input';
import { Grid, GridCol } from '../common/Grid';
import { Tabs, Tab } from '../common/Tabs';
import Section from '../common/Section'

import { toggleCreateDialog, createAccount, setTabIndex, toggleEditDialog, updateAccount } from '../../redux/actions/accounts';
import { getCreateDialogIsOpen, getAccounts, getAccountById, getTabIndex, getEditDialogIsOpen } from '../../redux/selectors/accounts'

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
            createForm: {},
            editForm: {}
        }

        this.handleClickCreateAccount = this.handleClickCreateAccount.bind(this)
        this.handleClickEditAccount = this.handleClickEditAccount.bind(this)
        this.handleRequestCloseCreateDialog = this.handleRequestCloseCreateDialog.bind(this)
        this.handleRequestCloseEditDialog = this.handleRequestCloseEditDialog.bind(this)
        this.handleCreateAccount = this.handleCreateAccount.bind(this)
        this.handleEditAccount = this.handleEditAccount.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleTabClick = this.handleTabClick.bind(this)
    }

    componentDidMount () {
        const { tabIndex, accounts } = this.props;

        if(accounts.length !== 0) {
            this.setState({
                editForm: accounts[tabIndex]
            })
        }
    }
    

    componentWillReceiveProps (nextProps) {
        const { tabIndex, accounts } = this.props;

        if(tabIndex !== nextProps.tabIndex) {
            this.setState({
                editForm: accounts[nextProps.tabIndex]
            })
        }

        if(accounts.length !== nextProps.accounts.length) {
            this.setState({
                editForm: nextProps.accounts[nextProps.tabIndex]
            })
        }
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
                
                { this.renderTabs() }

                <Section textAlign="right">
                    <Button 
                        icon="mode_edit" 
                        type="plain" 
                        size="small"
                        onClick={ this.handleClickEditAccount }
                    >Edit Account</Button>
                </Section>

                { this.renderNoAccounts() }
                { this.renderCreateDialog() }
                { this.renderEditDialog() }

            </View>
        )
    }

    renderNoAccounts() {
        const { accounts } = this.props;

        if(accounts.length === 0) {
            return (
                <Section textAlign="center" spacer={{
                    value: 2
                }}>
                    <p>You have no accounts.</p>
                    <p><Button onClick={ this.handleClickCreateAccount }>Add account</Button></p>
                </Section>
            )
        }
    }

    renderTabs() {
        const { accounts, tabIndex } = this.props;

        if(accounts.length === 0) return null;
        
        return (
            <Section
                spacer={{
                    value: 2
                }}
            >
                <Tabs selectedIndex={ tabIndex } onItemClick={ this.handleTabClick }>
                    { accounts.map(account => (
                        <Tab key={ account.id }>{ account.name }</Tab>
                    )) }
                </Tabs>
            </Section>
        )
    }

    renderCreateDialog() {
        const { createDialogOpen } = this.props;

        return (
            <Dialog 
                open={ createDialogOpen }
                modal
                onRequestClose={ this.handleRequestCloseCreateDialog }
                title="Create new Account"
            >
                <Grid>
                    <GridCol>
                        <Input
                            name="name"
                            label="Name"
                            value={ this.state.createForm.name || '' }
                            onChange={ e => this.handleInputChange('createForm', e) }
                        />
                    </GridCol>
                    <GridCol>
                        <Input
                            name="balance"
                            label="Current balance"
                            type="number"
                            value={ this.state.createForm.balance || '' }
                            onChange={  e => this.handleInputChange('createForm', e)  }
                        />
                    </GridCol>
                </Grid>
                <Section
                    textAlign="right"
                    spacer={{
                        type: 'top',
                        value: 2
                    }}
                >
                    <Button type="plain" onClick={ this.handleRequestCloseCreateDialog }>Cancel</Button>
                    <Button 
                        type="primary" 
                        onClick={ this.handleCreateAccount }
                        disabled={
                            !this.state.createForm.name || !this.state.createForm.balance
                        }
                    >Create Account</Button>
                </Section>
            </Dialog>
        )
    }

    renderEditDialog() {
        const { editDialogOpen } = this.props;

        return (
            <Dialog 
                open={ editDialogOpen }
                modal
                onRequestClose={ this.handleRequestCloseEditDialog }
                title="Edit Account"
            >
                <Grid>
                    <GridCol>
                        <Input
                            name="name"
                            label="Name"
                            value={ this.state.editForm.name || '' }
                            onChange={ e => this.handleInputChange('editForm', e) }
                        />
                    </GridCol>
                    
                </Grid>
                <Section
                    textAlign="right"
                    spacer={{
                        type: 'top',
                        value: 2
                    }}
                >
                    <Button type="plain" onClick={ this.handleRequestCloseEditDialog }>Cancel</Button>
                    <Button 
                        type="primary" 
                        onClick={ this.handleEditAccount }
                    >Save</Button>
                </Section>
            </Dialog>
        )
    }

    handleClickCreateAccount() {
        const { dispatch } = this.props;
        dispatch(toggleCreateDialog());
    }

    handleClickEditAccount() {
        const { dispatch } = this.props;
        dispatch(toggleEditDialog());
    }

    handleRequestCloseCreateDialog() {
        const { dispatch } = this.props;
        dispatch(toggleCreateDialog());
    }

    handleRequestCloseEditDialog() {
        const { dispatch } = this.props;
        dispatch(toggleEditDialog());
    }

    handleInputChange(field, e) {
        const { name, value } = e.target;
        
        this.setState({
            [field]: assign({}, this.state[field], {
                [name]: value
            })
        })
    }

    handleCreateAccount() {
        const { dispatch } = this.props;
        const { createForm } = this.state;

        dispatch(createAccount(createForm));
        dispatch(toggleCreateDialog());

        this.setState({
            createForm: {}
        })
    }

    handleEditAccount() {
        const { dispatch, tabIndex, accounts } = this.props;
        const { editForm } = this.state;
        const id = accounts[tabIndex].id;

        dispatch(updateAccount(id, editForm));
        dispatch(toggleEditDialog());

        this.setState({
            editForm: {}
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
        editDialogOpen: getEditDialogIsOpen(state),
        accounts: getAccounts(state).map(id => getAccountById(state, id)),
        tabIndex: getTabIndex(state)
    }
}

export default createPageHandler(
    connect(mapState)(AccountsPage), {
    navIndex: 0
})