import React, { PropTypes } from 'react'
import styled from 'styled-components';

import { numeral } from '../../utils/numeral';
import { getColorForValue } from'../../utils/styles';
import { Tabs, Tab } from '../common/Tabs';

const Amount = styled.sup`
    padding-left: 5px;
    display: inline-block;
    font-size: 12px;
`

const AccountTabs = ({
    accounts,
    accountsEntities,
    tabIndex,
    handleTabClick
}) => {
    return (
        <Tabs selectedIndex={ tabIndex } onItemClick={ handleTabClick }>
            { accounts.map(id => {
                const account = accountsEntities[id]
                return (
                    <Tab key={ account.id }>
                        { account.name }
                        <Amount>
                            <span style={{
                                color: getColorForValue(account.balance)
                            }}>
                                { numeral(account.balance).format('$ 0,0.00') }
                            </span>
                        </Amount>
                    </Tab>
                )
            }) }
        </Tabs>
    )
}

AccountTabs.defaultProps = {
    handleTabClick: () => {},
    tabIndex: 0
}

AccountTabs.propTypes = {
    accounts: PropTypes.array.isRequired,
    accountsEntities: PropTypes.object.isRequired,
    tabIndex: PropTypes.number,
    handleTabClick: PropTypes.func,
}

export default AccountTabs