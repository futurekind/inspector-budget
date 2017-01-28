import React from 'react';
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

const Footer = () => {
    return (
        <View>
            Last saved: 3748-23993-3203 | Saving...
        </View>
    )
}

export default Footer