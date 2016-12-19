import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import NavigationBtn from './NavigationBtn';

describe('NavigationBtn', () => {

    it('renders correctly', () => {
        const wrapper = shallow(<NavigationBtn to="" />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    })

    it('renders icon when passed as prop', () => {
        const wrapper = shallow(<NavigationBtn to="" icon="my-icon" />)
        expect(toJSON(wrapper)).toMatchSnapshot();
    })

    it('renders as active when passed as prop', () => {
        const wrapper = shallow(<NavigationBtn to="" active />)
        expect(toJSON(wrapper)).toMatchSnapshot();
    })

    it('renders its children', () => {
        const wrapper = shallow(<NavigationBtn to="">Label</NavigationBtn>)
        expect(toJSON(wrapper)).toMatchSnapshot();
    })

    it('delegates onClick prop', () => {
        const spy = jest.fn();
        const wrapper = shallow(<NavigationBtn to="" onClick={spy} />)
        const button = wrapper.find('button');
        wrapper.simulate('click');

        expect(spy).toHaveBeenCalled()
    })

})