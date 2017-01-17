import React, { Component } from 'react';
import { connect } from 'react-redux';
import assign from 'lodash.assign';

import Table from '../common/Datatable';
import { getColorForValue } from '../../utils/styles';
import { numeral } from '../../utils/numeral';
import * as accountSelectors from '../../redux/selectors/accounts'
import * as transactionSelectors from '../../redux/selectors/transactions'

class AccountsDatatable extends Component {
    render () {
        
        const { accountsEntities, transactions, transactionsEntities } = this.props;

        return (
            <Table
                headerRow={[
                    { key: 'date', label: 'Date' },
                    { key: 'account', label: 'Account' },
                    { key: 'payee', label: 'Payee' },
                    { key: 'cat', label: 'Category' },
                    { key: 'amount', label: 'Amount', size: 120, align: 'right' },
                ]}
                data={ transactions.map(id => {
                    const ta = transactionsEntities[id];

                    return assign({}, transactionsEntities[id], {
                        account: accountsEntities[ta.account_id].name,
                        amount: <span style={{ color: getColorForValue(ta.amount)}}>{ numeral(ta.amount).format()}</span>
                    })
                }) }
                onClickRow={(index) => console.log(index)}
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