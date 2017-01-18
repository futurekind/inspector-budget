import React from 'react';
import { shallow, mount, render } from 'enzyme';
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

    describe('sorting', () => {
        const CustomEl = ({children, onClick}) => <div onClick={onClick}>{children}</div>;
        const renderer = ({
            sortBy,
            name,
            children,
            onClick
        }) => <CustomEl testKey="renderer" name={ name } sortBy={ sortBy } onClick={ onClick }>{children}</CustomEl>

        const wrapper = mount(
            <Datatable rows={[
                { key: 'id', label: 'Id' },
                { key: 'name', label: 'Name' },
            ]} data={[
                { id: '2', name: 'a Name'},
                { id: '1', name: 'z Name'},
            ]} headerCellRenderer={ renderer } />
        )

        const Cell = wrapper.find(CustomEl)

        it('passes name prop to custom renderer', () => {
            expect(Cell.get(0).props.name).toBe('id')
            expect(Cell.get(1).props.name).toBe('name')
        })

        it('passes sorting props to custom renderer', () => {
            wrapper.setProps({
                sortBy: { key: 'id', order: 'ASC' }
            })

            expect(Cell.get(0).props.sortBy).toEqual({
                 key: 'id', order: 'ASC' 
            })
        })

        it('delegates click to onSort prop', () => {
            const clickSpy = jest.fn();

            wrapper.setProps({
                onSort: clickSpy
            })

            const el = wrapper.findWhere(n => {
                return n.props().testKey === 'headerCell';
            })
            
            el.at(1).simulate('click')
            
            expect(clickSpy).toBeCalledWith('name')
        })

    })

    describe('displayValueRenderer', () => {

        const Dvr = ({
            children
        }) => <b id="dvr">{ children }</b>

        const wrapper = mount(
            <Datatable
                rows={[
                    { key: 'foo', label: 'Foo', displayValueRenderer: Dvr }
                ]}
                data={[
                    { foo: 'Some Foo' }
                ]}
            />
        )

        it('renders', () => {
            console.log(wrapper.debug());
            const dvrs = wrapper.find({id: 'dvr'});
            
            expect(dvrs.length).toBe(1)
        })

    })

})