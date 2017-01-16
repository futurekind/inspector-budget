import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createPageHandler } from '../common/Page';
import styled from 'styled-components';
import assign from 'lodash.assign';
import { numeral } from '../../utils/numeral';

import PageHeading from '../common/PageHeading';
import Divider from '../common/Divider';
import Button from '../common/Button';
import Dialog from '../common/Dialog';
import Input from '../common/Input';
import { Grid, GridCol } from '../common/Grid';
import { Tabs, Tab } from '../common/Tabs';
import Section from '../common/Section';
import Table from '../common/Datatable';

import { toggleCreateDialog, createAccount, setTabIndex, toggleEditDialog, updateAccount, deleteAccount } from '../../redux/actions/accounts';
import { getCreateDialogIsOpen, getAccounts, getTabIndex, getEditDialogIsOpen, getAccountsEntities } from '../../redux/selectors/accounts'

const View = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Header = styled.header`
    display: flex;
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
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this)
    }

    componentDidMount () {
        const { tabIndex, accountsEntities, accounts } = this.props;
        const editForm = accountsEntities[accounts[tabIndex]]

        if(accounts.length !== 0) {
            this.setState({
                editForm
            })
        }
    }
    

    componentWillReceiveProps (nextProps) {
        const { tabIndex, accounts } = this.props;
        const editForm = nextProps.accountsEntities[nextProps.accounts[nextProps.tabIndex]]

        if(tabIndex !== nextProps.tabIndex) {
            this.setState({
                editForm
            })
        }

        if(accounts.length !== nextProps.accounts.length) {
            this.setState({
                editForm
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
                { this.renderActions() }
                { this.renderDatatable() }

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
        const { accounts, accountsEntities, tabIndex } = this.props;

        if(accounts.length === 0) return null;
        
        return (
            <Section
                spacer={{
                    value: 2
                }}
            >
                <Tabs selectedIndex={ tabIndex } onItemClick={ this.handleTabClick }>
                    { accounts.map(id => {
                        const account = accountsEntities[id]
                        return <Tab key={ account.id }>{ account.name }</Tab>
                    }) }
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
                            onBlur={ e => this.handleInputChange('createForm', e) }
                        />
                    </GridCol>
                    <GridCol>
                        <Input
                            name="balance"
                            label="Current balance"
                            onBlur={  e => this.handleInputChange('createForm', e)  }
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

    renderActions() {
        const { accounts } = this.props;
        if(accounts.length === 0) return null;

        return (
            <Section textAlign="right">
                <Button 
                    icon="mode_edit" 
                    type="plain" 
                    size="small"
                    onClick={ this.handleClickEditAccount }
                >Edit Account</Button>
                <Button 
                    icon="delete" 
                    type="plain" 
                    size="small"
                    onClick={ this.handleDeleteAccount }
                >Delete Account</Button>
            </Section>
        )
    }

    renderDatatable() {
        const { accounts } = this.props;

        if(accounts.length === 0) return null;

        return (
            <Table
                headerRow={[
                    { key: 'id', label: 'ID', size: 200 },
                    { key: 'payee', label: 'Payee' },
                    { key: 'amount', label: 'Amount', size: 120, align: 'right' },
                    { key: 'actions', label: 'Actions', align: 'right' },
                ]}
                data={[
                    { id: '12lökjsdf', payee: 'Strom', amount: -123 },
                    { id: '09324ihg', payee: 'Auto', amount: -800 },
                    { id: '09324ihg', payee: 'Auto', amount: -800 },
                    { id: '09324ihg', payee: 'Auto', amount: -800 },
                    { id: '09324ihg', payee: 'Auto', amount: -800 },
                    { id: '09324ihg', payee: 'Auto', amount: -800 },
                    { id: '09324ihg', payee: 'Auto', amount: -800 },
                    { id: '09324ihg', payee: 'Auto', amount: -800 },
                    { id: '09324ihg', payee: 'Auto', amount: -800 },
                    { id: '09324ihg', payee: 'Auto', amount: -800 },
                    { id: '09324ihg', payee: 'Auto', amount: -800 },
                    { id: '09324ihg', payee: 'Auto', amount: -800 },
                    { id: '09324ihg', payee: 'Auto', amount: -800 },
                    { id: '09324ihg', payee: 'Auto', amount: -800 },
                    { id: '09324ihg', payee: 'Auto', amount: -800 },
                    { id: '09324ihg', payee: 'Auto', amount: -800 },
                    { id: '09324ihg', payee: 'Auto', amount: -800 },
                    { id: '09324ihg', payee: 'Auto', amount: -800 },
                ]}
                onClickRow={(index) => console.log(index)}
            />
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
        let val;

        switch(name) {
            case 'balance':
                val = numeral(value).value()
                break;
            default:
                val = value;
                break;
        }

        this.setState({
            [field]: assign({}, this.state[field], {
                [name]: val
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
        const { dispatch, tabIndex, accountsEntities, accounts } = this.props;
        const { editForm } = this.state;
        const id = accountsEntities[accounts[tabIndex]].id;

        dispatch(updateAccount(id, editForm));
        dispatch(toggleEditDialog());

        this.setState({
            editForm: {}
        })
    }

    handleDeleteAccount() {
        const { accountsEntities, accounts, tabIndex, dispatch } = this.props;
        const account = accountsEntities[accounts[tabIndex]];
        const confirm = window.confirm(`Are you sure you want to delete the account "${account.name}"`)

        if(confirm) {
            dispatch(deleteAccount(account.id));
        }

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
        accounts: getAccounts(state),
        accountsEntities: getAccountsEntities(state),
        tabIndex: getTabIndex(state)
    }
}

export default createPageHandler(
    connect(mapState)(AccountsPage), {
    navIndex: 0
})