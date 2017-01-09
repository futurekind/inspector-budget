import React, { PropTypes } from 'react'
import styled from 'styled-components';
import { fonts, colors, rgba } from '../../utils/styles';

const Btn = styled.button`
    padding: ${({size}) =>
        size === 'large' ? '16px 18px' : 
        size === 'small' ? '4px 6px' : '10px 12px'
    };
    border: none;
    border-radius: 3px;
    display: inline-flex;
    align-items: center;
    background: ${({type}) => 
        type === 'primary' ? colors.highlight : 
        type === 'plain' ? 'none' : colors.primary
    };
    font-family: ${fonts.primary};
    color: ${({type}) => 
        type === 'plain' ? colors.dark : '#fff'
    };
    font-size: ${({size}) =>
        size === 'large' ? '18px' :
        size === 'small' ? '10px' : '14px'
    };
    text-transform: ${({type}) => 
        type === 'plain' ? 'none' : 'uppercase'
    };
    text-shadow: ${({type}) => 
        type === 'plain' ? 'none' : `${rgba('#000', .3)} 0 -1px 0`
    };
    text-decoration: none;
    cursor: pointer;

    & + & {
        margin-left: 12px;
    }
`

const BtnIcon = styled.i`
    padding-right: 4px;
    text-shadow: none;
    font-size: 1.5em;
`


const Button = ({
    children,
    type,
    size,
    icon,
    onClick
}) => {
    return (
        <Btn 
            onClick={ onClick }
            type={ type }
            size={ size }
        >
            { icon && <BtnIcon className="material-icons">{ icon }</BtnIcon> }
            { children }
        </Btn>
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