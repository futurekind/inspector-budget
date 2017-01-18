import React from 'react';
import { shallow, mount } from 'enzyme';
import Datatable from '../Datatable';

const rows = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
]

const data = [
    { id: 'data1', name: 'Data 1'},
    { id: 'data2', name: 'Data 2'},
]

const CustomRenderer = props => {
    return <div id="customRenderer">{ props.children }</div>
}

describe('Datatable', () => {

    const wrapper = shallow(
        <Datatable rows={ rows } data={ data } />
    )

    describe('header rows', () => {
        const HeaderCells = wrapper.find({testKey: 'headerCell'})
        
        it('has the expected length', () => {
            expect(HeaderCells.length).toBe(2)
        })

        it('renders its children', () => {
            expect(HeaderCells.get(0).props.children).toBe('ID')
            expect(HeaderCells.get(1).props.children).toBe('Name')
        })

        it('applies the headerCellRenderer', () => {
            const wrapper = mount(
                <Datatable data={ data } rows={ rows } headerCellRenderer={ CustomRenderer }/>
            )
            const CustomRenderers = wrapper.find({id: 'customRenderer'})
            
            expect(CustomRenderers.length).toBe(2)
        })

        it('sets the correct header styles', () => {
            const wrapper = shallow(
                <Datatable data={ [
                    { sizeAndAlign: 'Foo', size: 'Foo' },
                    { sizeAndAlign: 'Foo', size: 'Foo' },
                    { sizeAndAlign: 'Foo', size: 'Foo' },
                ] } rows={ [
                    {key: 'sizeAndAlign', label: 'Size and Align', size: 60, align: 'center'},
                    {key: 'size', label: 'Size', size: 100},
                    {key: 'align', label: 'Align', align: 'right'},
                ] }/>
            )

            const HeaderCols = wrapper.find({testKey: 'headerColumn'})
            
            expect(HeaderCols.get(0).props.style).toEqual({
                width: 60,
                flex: 'none',
                textAlign: 'center'
            })

            expect(HeaderCols.get(1).props.style).toEqual({
                width: 100,
                flex: 'none',
            })

            expect(HeaderCols.get(2).props.style).toEqual({
                textAlign: 'right',
            })
        })
    })

})