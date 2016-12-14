import React from 'react';
import styled from 'styled-components';
import { colors, noise } from '../../utils/styles';

const View = styled.nav`
    width: 250px;
    background-color: ${colors.highlight__quite};
    ${noise()}
`

const Sidebar = () => {
    return (
        <View></View>
    )
}

export default Sidebar