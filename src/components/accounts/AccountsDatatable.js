import React, { Component } from 'react';
import { connect } from 'react-redux';
import assign from 'lodash.assign';
import styled from 'styled-components';

import Table from '../common/Datatable';
import { getColorForValue, colors, rgba } from '../../utils/styles';
import { numeral } from '../../utils/numeral';
import * as accountSelectors from '../../redux/selectors/accounts'
import * as transactionSelectors from '../../redux/selectors/transactions'

const Cell = styled.div`
    padding: .6em .3em;
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
`

const Amount = styled.span`
    font-style: italic
`

const rows = [
    { key: 'date', label: 'Date' },
    { key: 'account', label: 'Account' },
    { key: 'payee', label: 'Payee' },
    { key: 'cat', label: 'Category' },
    { key: 'amount', label: 'Amount', size: 120, align: 'right', displayValueRenderer: Amount },
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
    render () {

        return (
            <Table
                rows={ rows }
                data={ mapData(this.props) }
                cellRenderer={ Cell }
                headerCellRenderer={ HeaderCell }
            />
        )
    }
}

const mapState = state => ({
    accountsEntities: accountSelectors.getAccountsEntities(state),
    transactions: transactionSelectors.getTransactionsByAccount(state),
    transactionsEntities: transactionSelectors.getTransactionsEntities(state)
})

export default connect(mapState)(AccountsDatatable)