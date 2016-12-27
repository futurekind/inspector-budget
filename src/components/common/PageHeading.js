import React from 'react';
import styled from 'styled-components';
import { colors } from '../../utils/styles'

const Heading = styled.h1`
    margin: 0;
    padding: 0;
    color: ${colors.dark}
    font-weight: 300;
    font-size: 44px;
`

const PageHeading = ({
    children
}) => {
    return (
        <Heading>{ children }</Heading>
    )
}

export default PageHeading