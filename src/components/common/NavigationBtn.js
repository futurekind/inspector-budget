import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { colors, sizes, fonts, rgba } from '../../utils/styles';

const Button = styled.button`
    width: 100%;
    height: ${sizes.navigationWidth}px;
    border: none;
    border-bottom: 1px solid ${colors.dark};
    border-top: 1px solid ${colors.light};
    display: block;
    position: relative;
    color: #fff;
    background: ${props => props.active ? rgba(colors.primary, .4) : 'none'};
    font-family: ${fonts.primary};
    cursor: pointer;
    transition: background .2s;

    &:focus { outline: none; }

    &:first-child { border-top: none; }
    &:last-child { border-bottom: none; }
`

const Label = styled.span`
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
`

const Icon = styled.i`
    margin-bottom: 12px;
    display: block;
    font-size: 32px;
`

const NavigationBtn = ({
    children,
    onClick,
    icon,
    active
}) => {
    return (
        <Button onClick={ onClick } active={active}>
            <Label>
                {icon &&
                <Icon className="material-icons">{icon}</Icon>
                }
                { children }
            </Label>
        </Button>
    )
}

NavigationBtn.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.any,
    icon: PropTypes.string,
    active: PropTypes.bool,
}

export default NavigationBtn