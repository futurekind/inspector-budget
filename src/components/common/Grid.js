import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: -0.5em;
`

const Item = styled.div`
    flex: 1 0 5em;
    margin: 0.5em;
`

export const GridCol = ({
    children
}) => {
    return <Item>{ children }</Item>
}

export const Grid = ({
    children
}) => {
    return (
        <Container>
            { children }
        </Container>
    )
}