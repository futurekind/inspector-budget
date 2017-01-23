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
        const HeaderCells = wrapper.find('tbody').first().find('th');
        
        it('has the expected length', () => {
            expect(HeaderCells.length).toBe(2)
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
                    {key: 'sizeAndAlign', label: 'Size and Align', size: 60},
                    {key: 'size', label: 'Size', size: 100},
                ] }/>
            )

            const HeaderCols = wrapper.find('tbody').first().find('th');
            
            expect(HeaderCols.get(0).props.style).toEqual({
                width: 60
            })

            expect(HeaderCols.get(1).props.style).toEqual({
                width: 100,
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
            const cols = wrapper.find('tbody').last().find('td')

            expect(cols.length).toBe(6)
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

            const el = wrapper
                .find('tbody')
                .first()
                .find('th')
                .children()
                .at(1);

            el.simulate('click')
            
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
            const dvrs = wrapper.find({id: 'dvr'});
            
            expect(dvrs.length).toBe(1)
        })

    })

    describe('editValueRenderer', () => {

        const Evr = ({
            value
        }) => <input type="text" id="evr" defaultValue={value} />

        const wrapper = mount(
            <Datatable
                rows={[
                    { key: 'foo', label: 'Foo', editValueRenderer: Evr },
                    { key: 'bar', label: 'Bar'},
                ]}
                data={[
                    { foo: 'Some Foo' },
                    { foo: 'Some Foo2', bar: 'Some Bar2' },
                    { foo: 'Some Foo2' },
                ]}
            />
        )

        it('renders default value', () => {
            const evrs = wrapper.find({id: 'evr'});
            expect(evrs.length).toBe(0)
        })

        it('renders edit value when selected prop is set', () => {
            wrapper.setProps({
                selected: {
                    row: 1,
                    cell: 0
                }
            })
            
            const evrs = wrapper.find({id: 'evr'});
            expect(evrs.length).toBe(1)
        })

    })

    describe('delegates cell click to onCell prop', () => {
        
        const wrapper = shallow(
            <Datatable
                rows={[
                    { key: 'foo', label: 'Foo'},
                    { key: 'bar', label: 'Bar' },
                ]}
                data={[
                    { foo: 'Some Foo', bar: 'Some Bar' },
                    { foo: 'Some Foo2', bar: 'Some Bar2' },
                ]}
            />
        )

        it('delegates rowIndex and cellIndex of cell[0,0]', () => {
            const spy = jest.fn();
            
            wrapper
                .setProps({onCell: spy})
                .find('tbody')
                .last()
                .find('td')
                .children()
                .at(0)
                .simulate('click')
            
            expect(spy).toBeCalledWith({
                row: 0, cell: 0
            })
        })

        it('delegates rowIndex and cellIndex of cell[0,1]', () => {
            const spy = jest.fn();

            wrapper
                .setProps({onCell: spy})
                .find('tbody')
                .last()
                .find('td')
                .children()
                .at(1)
                .simulate('click')
            
            expect(spy).toBeCalledWith({
                row: 0, cell: 1
            })
        })

        it('delegates rowIndex and cellIndex of cell[1,0]', () => {
            const spy = jest.fn();

            wrapper
                .setProps({onCell: spy})
                .find('tbody')
                .last()
                .find('td')
                .children()
                .at(2)
                .simulate('click')
            
            expect(spy).toBeCalledWith({
                row: 1, cell: 0
            })
        })

        it('delegates rowIndex and cellIndex of cell[1,1]', () => {
            const spy = jest.fn();

            wrapper
                .setProps({onCell: spy})
                .find('tbody')
                .last()
                .find('td')
                .children()
                .at(3)
                .simulate('click')
            
            expect(spy).toBeCalledWith({
                row: 1, cell: 1
            })
        })
    })

    describe('onTabAndArrow', () => {
        const spy = jest.fn();

        const wrapper = shallow(
            <Datatable rows={[
                { key: 'id', label: 'ID' },
                { key: 'date', label: 'Date' },
                { key: 'name', label: 'Name' },
            ]} data={[
                { id: 1, date: 'date 1', name: 'Name 1' },
                { id: 2, date: 'date 2', name: 'Name 2' },
                { id: 3, date: 'date 3', name: 'Name 3' },
            ]} onTabAndArrow={ spy } selected={{
                row: 0,
                cell: 0
            }}/>
        )

        describe('<Tab>-Key', () => {
            it('returns the nextSelected', () => {
                wrapper.simulate('keydown', {
                    keyCode: 9,
                    preventDefault: () => {}
                })

                expect(spy).toHaveBeenLastCalledWith({
                    row: 0,
                    cell: 1
                });
            })

            it('returns the 0 for the next cell', () => {
                wrapper.setProps({
                    selected: {
                        row: 0,
                        cell: 2
                    }
                })
                
                wrapper.simulate('keydown', {
                    keyCode: 9,
                    preventDefault: () => {}
                })

                expect(spy).toHaveBeenLastCalledWith({
                    row: 0,
                    cell: 0
                });
            })
        })

        describe('<Backtab>-Key', () => {
            it('returns the nextSelected', () => {
                wrapper.setProps({
                    selected: {
                        row: 0,
                        cell: 2
                    }
                })
                
                wrapper.simulate('keydown', {
                    keyCode: 9,
                    shiftKey: true,
                    preventDefault: () => {}
                })

                expect(spy).toHaveBeenLastCalledWith({
                    row: 0,
                    cell: 1
                });
            })

            it('returns 2 for next cell', () => {
                wrapper.setProps({
                    selected: {
                        row: 0,
                        cell: 0
                    }
                })
                
                wrapper.simulate('keydown', {
                    keyCode: 9,
                    shiftKey: true,
                    preventDefault: () => {}
                })

                expect(spy).toHaveBeenLastCalledWith({
                    row: 0,
                    cell: 2
                });
            })
        })

        describe('<Up>-Key', () => {
            it('returns the nextSelected', () => {
                wrapper.setProps({
                    selected: {
                        row: 1,
                        cell: 1
                    }
                })

                wrapper.simulate('keydown', {
                    keyCode: 38,
                    preventDefault: () => {}
                })

                expect(spy).toHaveBeenLastCalledWith({
                    row: 0,
                    cell: 1
                });
            })

            it('returns current row index at the end', () => {
                wrapper.setProps({
                    selected: {
                        row: 0,
                        cell: 1
                    }
                })

                wrapper.simulate('keydown', {
                    keyCode: 38,
                    preventDefault: () => {}
                })

                expect(spy).toHaveBeenLastCalledWith({
                    row: 0,
                    cell: 1
                });
            })
        })

        describe('<Down>-Key', () => {
            it('returns the nextSelected', () => {
                wrapper.setProps({
                    selected: {
                        row: 1,
                        cell: 1
                    }
                })

                wrapper.simulate('keydown', {
                    keyCode: 40,
                    preventDefault: () => {}
                })

                expect(spy).toHaveBeenLastCalledWith({
                    row: 2,
                    cell: 1
                });
            })

            it('returns current row index at the end', () => {
                wrapper.setProps({
                    selected: {
                        row: 2,
                        cell: 1
                    }
                })

                wrapper.simulate('keydown', {
                    keyCode: 40,
                    preventDefault: () => {}
                })

                expect(spy).toHaveBeenLastCalledWith({
                    row: 2,
                    cell: 1
                });
            })
        })

        describe('<RIGHT>-Key', () => {
            it('returns the nextSelected', () => {
                wrapper.setProps({
                    selected: {
                        row: 1,
                        cell: 1
                    }
                })

                wrapper.simulate('keydown', {
                    keyCode: 39,
                    preventDefault: () => {}
                })

                expect(spy).toHaveBeenLastCalledWith({
                    row: 1,
                    cell: 2
                });
            })

            it('returns current row index at the end', () => {
                wrapper.setProps({
                    selected: {
                        row: 1,
                        cell: 2
                    }
                })

                wrapper.simulate('keydown', {
                    keyCode: 39,
                    preventDefault: () => {}
                })

                expect(spy).toHaveBeenLastCalledWith({
                    row: 1,
                    cell: 0
                });
            })
        })

        describe('<LEFT>-Key', () => {
            it('returns the nextSelected', () => {
                wrapper.setProps({
                    selected: {
                        row: 1,
                        cell: 1
                    }
                })

                wrapper.simulate('keydown', {
                    keyCode: 37,
                    preventDefault: () => {}
                })

                expect(spy).toHaveBeenLastCalledWith({
                    row: 1,
                    cell: 0
                });
            })

            it('returns current row index at the end', () => {
                wrapper.setProps({
                    selected: {
                        row: 1,
                        cell: 0
                    }
                })

                wrapper.simulate('keydown', {
                    keyCode: 37,
                    preventDefault: () => {}
                })

                expect(spy).toHaveBeenLastCalledWith({
                    row: 1,
                    cell: 2
                });
            })
        })

        describe('<ESC>-Key', () => {
            it('returns cell: -1, row: -1 as nextSelected', () => {
                wrapper.setProps({
                    selected: {
                        row: 1,
                        cell: 1
                    }
                })

                wrapper.simulate('keydown', {
                    keyCode: 27,
                    preventDefault: () => {}
                })

                expect(spy).toHaveBeenLastCalledWith({
                    row: -1,
                    cell: -1
                });
            })
        })
    })

})