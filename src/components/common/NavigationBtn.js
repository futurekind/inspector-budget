import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { colors, sizes } from '../../utils/styles';

const Button = styled.button`
    width: 100%;
    height: ${sizes.navigationWidth}px;
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

const NavigationBtn = ({
    children,
    onClick
}) => {
    return (
        <Button onClick={ onClick }>
            <span>{ children }</span>
        </Button>
    )
}

NavigationBtn.propTypes = {
    children: PropTypes.any,
    icon: PropTypes.string,
}

export default NavigationBtn