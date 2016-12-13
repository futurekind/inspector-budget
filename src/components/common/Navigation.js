import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { colors } from '../../utils/styles';

const View = styled.nav`
    height: 100%;
    position: relative;
    background-color: ${colors.dark};

    &:after {
        content: "";
        border: 10px solid transparent;
        border-left-color: ${colors.dark};
        position: absolute;
        top: 50px;
        right: -20px;
    }
`;

const Button = styled.button`
    width: 100%;
    padding-bottom: 100%;
    border: none;
    border-top: 1px solid ${colors.dark};
    border-bottom: 1px solid ${colors.light};
    display: block;
    position: relative;
    color: #fff;
    background: none;

    span {
        width: 100%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
`

const Navigation = () => {
    return (
        <View>
            <Button><span>1</span></Button>
            <Button><span>2</span></Button>
            <Button><span>3</span></Button>
        </View>
    )
}

Navigation.propTypes = {
    activeIndex: PropTypes.number.isRequired
}

export default Navigation