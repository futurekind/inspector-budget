import React, { PropTypes } from 'react'
import styled from 'styled-components';
import { fonts, colors, rgba } from '../../utils/styles';

const Btn = styled.button`
    padding: 10px 12px;
    border: none;
    border-radius: 3px;
    background: ${colors.primary};
    font-family: ${fonts.primary};
    color: #fff;
    font-size: 14px;
    text-transform: uppercase;
    text-shadow: ${rgba('#000', .3)} 0 -1px 0;
    cursor: pointer;

    & + & {
        margin-left: 12px;
    }
`


const Button = ({
    children
}) => {
    return (
        <Btn>{ children }</Btn>
    )
}

Button.defaultProps = {
    onClick: () => {},
    type: 'default',
    size: 'default'
}

Button.propTypes = {
    icon: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.oneOf([
        'default', 'plain', 'primary' 
    ]),
    size: PropTypes.oneOf([
        'default', 'small', 'large' 
    ]),
    
}

export default Button