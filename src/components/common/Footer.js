import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { colors, noise } from '../../utils/styles';

const View = styled.footer`
    height: 20px;
    padding: 0 10px;
    flex: 1 0 100%;
    background-color: ${colors.dark};
    text-align: right;
    color: #fff;
    font-weight: 300;
    font-size: 12px;
    line-height: 20px;
    ${noise()}
`

const Item = styled.div`
    padding: 0 10px;
    display: inline-block;
`

const Footer = ({
    items
}) => {
    return (
        <View>
            { items.map((item, i) => {
                return <Item key={ i }>{ item }</Item>
            }) }
        </View>
    )
}

Footer.defaultProps = {
    items: []
}

Footer.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string)
}

export default Footer