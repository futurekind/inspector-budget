import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Divider from '../Divider';
import { colors } from '../../../utils/styles'

describe('Divider', () => {
    const wrapper = shallow(<Divider />);

    it('renders without errors', () => {
        expect(toJSON(wrapper)).toMatchSnapshot()
    })

    it('renders the default color', () => {
        expect(wrapper.props().color).toBe(colors.dark)
    })

    it('renders type="light"', () => {
        wrapper.setProps({
            type: 'light'
        })

        expect(wrapper.props().color).toBe(colors.light)
    })

    it('renders type="highlight"', () => {
        wrapper.setProps({
            type: 'highlight'
        })

        expect(wrapper.props().color).toBe(colors.highlight)
    })

})