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
    children,
    sortBy,
    name,
    onClick
}) => {
    const RendererComponent = renderer;
    
    if(!renderer) return <div>{ children }</div>

    return <RendererComponent 
                name={ name } 
                onClick={ onClick }
                sortBy={ sortBy } 
                {...renderer.props}
            >{ children }</RendererComponent>
}

const Table = ({
    rows,
    data,
    cellRenderer,
    headerCellRenderer,
    sortBy,
    onSort
}) => {
    return (
        <View>
            <HeaderRow>
                { rows.map(header => {
                    return (
                        <Column 
                            testKey="headerColumn"
                            key={ header.key }
                            style={ getHeaderStyle(header) }
                        >
                            <CellRenderer 
                                testKey="headerCell" 
                                renderer={ headerCellRenderer }
                                sortBy={ sortBy }
                                name={ header.key }
                                onClick={ onSort 
                                    ? () => onSort(header.key) 
                                    : null
                                }
                            >{ header.label }</CellRenderer>

                        </Column>
                    )
                }) }
            </HeaderRow>
            <Row>
                { rows.map(header => {
                    return (
                        <Column 
                            testKey="dataColumn"
                            key={ header.label }
                            style={ getHeaderStyle(header) }
                        >

                            { data.map((item, i) => {
                                return (
                                    <CellRenderer testKey="dataCell" key={ i } renderer={ cellRenderer }>{
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
            displayValueRenderer: PropTypes.func,
            editValueRenderer: PropTypes.func,
        }),
    ).isRequired,
    data: PropTypes.arrayOf(
        PropTypes.object
    ),
    cellRenderer: PropTypes.func,
    headerCellRenderer: PropTypes.func,
    sortBy: PropTypes.shape({
        key: PropTypes.string.isRequired,
        order: PropTypes.oneOf(['ASC', 'DESC']).isRequired,
    }),
    onSort: PropTypes.func,
}

export default Table