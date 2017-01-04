import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { colors, rgba } from '../../utils/styles'

const View = styled.div`
    margin-bottom: 24px;
`

const Label = styled.span`
    margin-bottom: 10px;
    display: block;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: bold;
`;

const Field = styled.input`
    width: 100%;
    padding: 12px;
    border: none;
    border-bottom: 2px solid ${colors.primary};
    border-radius: 3px;
    background: ${rgba(colors.light, .1)};
    font-size: 16px;
    color: ${colors.dark}

    &:focus {
        outline: none;
        border-bottom-color: ${colors.highlight}
    }
`;


const Input = ({label, ...props}) => {
    
    return (
        <View>
            <label>
                <Label> { label }</Label>
                <Field {...props} />
            </label>
        </View>
    )
}

Input.propTypes = {
    label: PropTypes.string,
}

export default Input