import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Navigation from '../Navigation';

describe('Navigation', () => {

    it('renders correctly', () => {
        const wrapper = shallow(<Navigation activeIndex={-1} />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    })

    it('composes its children', () => {
        const wrapper = shallow(
            <Navigation activeIndex={-1}>
                <button className="one">One</button>
                <button className="two">Two</button>
            </Navigation>
        )

        const button1 = wrapper.find('.one');
        const button2 = wrapper.find('.two');
        
        expect(toJSON(button1)).toMatchSnapshot();
        expect(toJSON(button2)).toMatchSnapshot();
    })

    it('handles onClick on children', () => {
        const spy = jest.fn();

        const wrapper = shallow(
            <Navigation activeIndex={-1} onItemClick={spy}>
                <button className="btn1" title="bar">One</button>
                <button className="btn2" title="baz">Two</button>
            </Navigation>
        )

        const btn1 = wrapper.find('.btn1');
        const btn2 = wrapper.find('.btn2');

        btn1.simulate('click');

        expect(spy).toHaveBeenCalledWith(0, {
            className: 'btn1',
            title: 'bar',
            children: 'One'
        })

        btn2.simulate('click');

        expect(spy).toHaveBeenCalledWith(1, {
            className: 'btn2',
            title: 'baz',
            children: 'Two'
        })
    })

})