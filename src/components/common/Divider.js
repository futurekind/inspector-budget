import React, {PropTypes} from 'react';
import styled from 'styled-components';
import { colors } from '../../utils/styles'

const Hr = styled.hr`
    width: 100%;
    height: 1px;
    border: none;
    background-color: ${props => props.color}
`
const getColor = type => {
    switch (type) {
        case 'light':
            return colors.light;
        case 'highlight':
            return colors.highlight
        default:
            return colors.dark
    }
}

const Divider = ({
    type
}) => {
    return (
        <Hr color={ getColor(type) } />
    )
}

Divider.defaultProps = {
    type: 'default'
}

Divider.propTypes = {
    type: PropTypes.oneOf([
        'default', 'light', 'highlight'
    ]),
}

export default Divider