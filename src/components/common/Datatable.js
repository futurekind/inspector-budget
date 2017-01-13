import React, { PropTypes } from 'react'
import styled from 'styled-components';

const View = styled.section`
    display: flex;
    xflex-direction: column;
`

const Table = ({
    children
}) => {
    return (
        <View>
            <div>Hallo</div>
            <div>Table</div>
            <div>Felx</div>
            <div>Box</div>
        </View>
    )
}

export { Table }