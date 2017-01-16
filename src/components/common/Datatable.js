import React, { PropTypes } from 'react'
import styled from 'styled-components';

import { colors, rgba } from '../../utils/styles';

const View = styled.section`
    display: flex;
    flex: 1;
    overflow: auto;
`

const Column = styled.div`
    flex: 1;
`

const Cell = styled.div`
    padding: .6em .3em;
    border-bottom: 1px solid ${colors.highlight__quite};
    font-size: 14px;

    &:nth-child(even) {
        background: ${rgba(colors.highlight__quite, .1)};
    }

    cursor: ${({onClick}) => onClick ? 'pointer' : 'normal'};
`

const HeaderCell = styled(Cell)`
    font-weight: bold;
`

const getHeaderStyle = props => {
    if(props.size && props.align) return {
        width: props.size,
        flex: 'none',
        textAlign: props.align
    } 
    
    if(props.size) return {
        width: props.size,
        flex: 'none'
    }

    if(props.align) return {
        textAlign: props.align
    }

    return {}
}

const Table = ({
    headerRow,
    data,
    onClickRow
}) => {
    return (
        <View>
            { headerRow.map(header => {
                return (
                    <Column 
                        key={ header.label }
                        style={ getHeaderStyle(header) }
                    >
                        <HeaderCell>{ header.label }</HeaderCell>

                        { data.map((item, i) => {
                            return (
                                <Cell key={i} onClick={ onClickRow ? () => onClickRow(i) : null }>{ 
                                    item[header.key]
                                    ? item[header.key] 
                                    : '-'
                                }</Cell>
                            )
                        }) }

                    </Column>
                )
            }) }
        </View>
    )
}

Table.propTypes = {
    headerRow: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            size: PropTypes.number,
            align: PropTypes.string,
        }),
    ).isRequired,
    data: PropTypes.arrayOf(
        PropTypes.object
    ),
    onClickRow: PropTypes.func,
}

export default Table