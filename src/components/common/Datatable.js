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

const handleKeyDown = (handler, e) => {
    if(e.keyCode === 9) {
        e.preventDefault();
        
        if(e.shiftKey) {
            handler(true)
        } else {
            handler(false)
        }
    }
}

const Datatable = ({
    rows,
    data,
    cellRenderer,
    headerCellRenderer,
    sortBy,
    onSort,
    onCell,
    onTab,
    selected,
}) => {
    
    return (
        <View onKeyDown={ e => handleKeyDown(onTab, e) }>
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
    onTab: () => {}
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
    onTab: PropTypes.func,
}

export default Datatable