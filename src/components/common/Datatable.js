import React, { PropTypes } from 'react'
import styled from 'styled-components';

const View = styled.div`
    display: flex;
    flex-direction: column;
`

const Row = styled.div`
    display: flex;
    overflow-y: auto;
`

const HeaderRow = styled(Row)`
    overflow-x: visible;
    flex: 1 0 auto;
`

const Column = styled.div`
    flex: 1;
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

const CellRenderer = ({
    renderer,
    children
}) => {
    const RendererComponent = renderer;

    if(!renderer) return <div>{ children }</div>

    return <RendererComponent {...renderer.props}>{ children }</RendererComponent>
}

const Table = ({
    rows,
    data,
    cellRenderer,
    headerCellRenderer
}) => {
    return (
        <View>
            <HeaderRow>
                { rows.map(header => {
                    return (
                        <Column 
                            testKey="headerColumn"
                            key={ header.label }
                            style={ getHeaderStyle(header) }
                        >
                            <CellRenderer testKey="headerCell" renderer={ headerCellRenderer }>{ header.label }</CellRenderer>

                        </Column>
                    )
                }) }
            </HeaderRow>
            <Row>
                { rows.map(header => {
                    return (
                        <Column 
                            key={ header.label }
                            style={ getHeaderStyle(header) }
                        >

                            { data.map((item, i) => {
                                return (
                                    <CellRenderer key={ i } renderer={ cellRenderer }>{
                                        item[header.key]
                                            ? item[header.key] 
                                            : '-' 
                                    }</CellRenderer>
                                )
                            }) }

                        </Column>
                    )
                }) }
            </Row>
        </View>
    )
}

Table.propTypes = {
    rows: PropTypes.arrayOf(
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
    cellRenderer: PropTypes.func,
    headerCellRenderer: PropTypes.func,
}

export default Table