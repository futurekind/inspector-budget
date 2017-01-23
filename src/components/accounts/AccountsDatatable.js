import React, { Component } from 'react';
import { connect } from 'react-redux';
import assign from 'lodash.assign';
import styled from 'styled-components';

import Table from '../common/Datatable';
import { colors, rgba } from '../../utils/styles';
import * as accountSelectors from '../../redux/selectors/accounts'
import * as transactionSelectors from '../../redux/selectors/transactions'

const Cell = styled.div`
    padding: .6em .3em;
    position: relative;
    border-bottom: 1px solid ${colors.highlight__quite};
    font-size: 14px;

    &:nth-child(even) {
        background: ${rgba(colors.highlight__quite, .1)};
    }

    cursor: ${({onClick}) => onClick ? 'pointer' : 'normal'};
`

const HeaderCell = styled(Cell)`
    font-weight: bold;
    border-bottom-width: 2px;
    border-bottom-color: ${colors.light};
    text-align: left;
`

const Amount = styled.span`
    font-style: italic
`

const Input = styled.input`
    width: 100%;
    font-size: 14px;
`

const EditField = (props) => <Input autoFocus {...props} onFocus={ e => e.target.select() } />

const rows = [
    { key: 'date', label: 'Date', editValueRenderer: EditField },
    { key: 'account', label: 'Account', editValueRenderer: EditField },
    { key: 'payee', label: 'Payee', editValueRenderer: EditField },
    { key: 'cat', label: 'Category', editValueRenderer: EditField },
    { key: 'amount', label: 'Amount', size: 120, align: 'right', displayValueRenderer: Amount, editValueRenderer: EditField },
]

const mapData = ({
    transactions,
    transactionsEntities,
    accountsEntities
}) => transactions.map(id => {
    const ta = transactionsEntities[id];

    return assign({}, transactionsEntities[id], {
        account: accountsEntities[ta.account_id].name
    })
})

class AccountsDatatable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: {
                row: -1,
                cell: -1
            }
        }

        this.handleCellClick = this.handleCellClick.bind(this)
        this.handleTab = this.handleTab.bind(this)
    }
    
    render () {
        const { selected } = this.state;
        
        return (
            <Table
                rows={ rows }
                data={ mapData(this.props) }
                cellRenderer={ Cell }
                headerCellRenderer={ HeaderCell }
                onCell={ this.handleCellClick }
                selected={ selected }
                onTab={ this.handleTab }
            />
        )
    }

    handleCellClick(selected) {
        this.setState({
            selected
        })
    }

    handleTab(isBackTab) {
        const { row, cell } = this.state.selected;
        let nextCell;

        if(isBackTab) {
            nextCell = cell - 1 > -1 
                ? cell - 1
                : rows.length - 1
        } else {
            nextCell = cell + 1 < rows.length 
                ? cell + 1
                : 0
        }

        this.setState({
            selected: {
                row,
                cell: nextCell
            }
        })
    }
}

const mapState = state => ({
    accountsEntities: accountSelectors.getAccountsEntities(state),
    transactions: transactionSelectors.getTransactionsByAccount(state),
    transactionsEntities: transactionSelectors.getTransactionsEntities(state)
})

export default connect(mapState)(AccountsDatatable)