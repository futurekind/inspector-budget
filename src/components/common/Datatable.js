import React, { PropTypes } from 'react'
import styled from 'styled-components';
import assign from 'lodash.assign';

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

const Table = styled.table`
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    border-spacing: 0;

    th, td {
        padding: 0;
    }
`

const getHeaderStyle = props => {
    
    if(props.size) return {
        width: props.size,
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

const DisplayValueRenderer = ({
    renderer,
    value
}) => {
    const RendererComponent = renderer;
    
    if(!renderer) return <span>{ value || '-' }</span>
    
    return <RendererComponent>{ value }</RendererComponent>;
}

const EditValueRenderer = ({
    renderer,
    value
}) => {
    const RendererComponent = renderer;
    if(!renderer) return <input type="text" value={ value } />
    
    return <RendererComponent value={ value } />
}

const calculateNextSelected = (selected, payload) => {
    const { type, data } = payload;
    const { cell, row } = selected;
    const rowLength = Object.keys(data[0]).length;
    
    switch(type) {
        case 'TAB':
            return assign({}, selected, {
                cell: cell + 1 < rowLength
                    ? cell + 1
                    : 0
            })

        case 'BACKTAB':
            return assign({}, selected, {
                cell: cell - 1 > -1  
                    ? cell - 1
                    : rowLength - 1
            })

        case 'UP':
            return assign({}, selected, {
                row: row - 1 > -1
                    ? row - 1
                    : row
            })

        case 'DOWN':
            return assign({}, selected, {
                row: row + 1 < data.length
                    ? row + 1
                    : row
            })

        default: 
            return selected
    }
}

const handleKeyDown = (handler, selected, data, e) => {
    let type = ''
    
    if(e.keyCode === 9) {
        e.preventDefault();
        
        if(e.shiftKey) {
            type = 'BACKTAB'
        } else {
            type = 'TAB'
        }
    }

    if(e.keyCode === 37) {
        e.preventDefault();
        type = 'LEFT'
    }

    if(e.keyCode === 38) {
        e.preventDefault();
        type = 'UP'
    }

    if(e.keyCode === 39) {
        e.preventDefault();
        type = 'RIGHT'
    }

    if(e.keyCode === 40) {
        e.preventDefault();
        type = 'DOWN'
    }

    handler(calculateNextSelected(selected, {
        type,
        data
    }))
}

const Datatable = ({
    rows,
    data,
    cellRenderer,
    headerCellRenderer,
    sortBy,
    onSort,
    onCell,
    onTabAndArrow,
    selected,
}) => {
    
    return (
        <View onKeyDown={ e => handleKeyDown(onTabAndArrow, selected, data, e) }>
            <HeaderRow>
                <Table>
                    <tbody>
                        <tr>
                            { rows.map(header => {
                                return (
                                    <th 
                                        key={ header.key }
                                        style={ getHeaderStyle(header) }
                                    >
                                        <CellRenderer 
                                            renderer={ headerCellRenderer }
                                            sortBy={ sortBy }
                                            name={ header.key }
                                            onClick={ onSort 
                                                ? () => onSort(header.key) 
                                                : null
                                            }
                                        >{ header.label }</CellRenderer>
                                    </th>
                                )
                            })}
                        </tr>
                    </tbody>
                </Table>
            </HeaderRow>
            <Row>
                <Table>
                    <tbody>
                    { data.map((item, rowIndex) => {
                        return (
                            <tr key={ rowIndex }>
                                { rows.map((header, cellIndex) => {
                                    const { row, cell } = selected || {};
                                    const dvr = <DisplayValueRenderer
                                                    renderer={ header.displayValueRenderer }
                                                    value={ item[header.key] }
                                                    foo="DisplayValueRenderer"
                                                />
                                    const evr = <EditValueRenderer
                                                    renderer={ header.editValueRenderer }
                                                    value={ item[header.key] }
                                                    foo="EditValueRenderer"
                                                />

                                    const renderer = rowIndex === row && cellIndex === cell
                                        ? evr
                                        : dvr
                                    
                                    return (
                                        <td
                                            key={ header.label }
                                            style={ getHeaderStyle(header) }
                                        >
                                            <CellRenderer 
                                                key={ cellIndex } 
                                                renderer={ cellRenderer }
                                                onClick={ () => onCell({
                                                    cell: cellIndex,
                                                    row: rowIndex
                                                })}
                                            >
                                                { renderer }
                                            </CellRenderer>
                                        </td>
                                    )
                                }) }
                            </tr>
                        )
                    }) }
                    </tbody>
                </Table>
            </Row>
        </View>
    )
}

Datatable.defaultProps = {
    onCell: () => {},
    onTabAndArrow: () => {},
}

Datatable.propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            size: PropTypes.number,
            displayValueRenderer: PropTypes.func,
            editValueRenderer: PropTypes.func,
        }),
    ).isRequired,
    data: PropTypes.arrayOf(
        PropTypes.object
    ),
    selected: PropTypes.shape({
        row: PropTypes.number.isRequired,
        cell: PropTypes.number.isRequired,
    }),
    cellRenderer: PropTypes.func,
    headerCellRenderer: PropTypes.func,
    sortBy: PropTypes.shape({
        key: PropTypes.string.isRequired,
        order: PropTypes.oneOf(['ASC', 'DESC']).isRequired,
    }),
    onCell: PropTypes.func,
    onSort: PropTypes.func,
    onTabAndArrow: PropTypes.func,
}

export default Datatable