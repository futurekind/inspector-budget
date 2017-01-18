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

    describe('data columns', () => {
        const wrapper = shallow(
            <Datatable rows={[
                    { key: 'foo', label: 'Foo' },
                    { key: 'bar', label: 'Bar' },
                    { key: 'baz', label: 'Bat' },
                ]} data={[
                    { foo: 'Foo 1', bar: 'Bar 1' },
                    { foo: 'Foo 2', baz: 'Baz 2' },
                ]} />
        )

        it('renders correct amount of columns', () => {
            const cols = wrapper.find({testKey: 'dataColumn'})
            expect(cols.length).toBe(3)
        })

        it('renders cells', () => {
            const cells = wrapper.find({testKey: 'dataCell'})
            
            expect(cells.get(0).props.children).toBe('Foo 1')
            expect(cells.get(1).props.children).toBe('Foo 2')
            expect(cells.get(2).props.children).toBe('Bar 1')
            expect(cells.get(3).props.children).toBe('-')
            expect(cells.get(4).props.children).toBe('-')
            expect(cells.get(5).props.children).toBe('Baz 2')
        })

        it('applies custom cell renderer', () => {
            const wrapper = mount(
            <Datatable rows={[
                    { key: 'foo', label: 'Foo' },
                    { key: 'bar', label: 'Bar' },
                    { key: 'baz', label: 'Bat' },
                ]} data={[
                    { foo: 'Foo 1', bar: 'Bar 1' },
                    { foo: 'Foo 2', baz: 'Baz 2' },
                ]}
                cellRenderer={ CustomRenderer }
            />
        )

            const customRenderers = wrapper.find({id: 'customRenderer'})
            expect(customRenderers.length).toBe(6)
        })

    })

})