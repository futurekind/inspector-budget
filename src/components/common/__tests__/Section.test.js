import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Section from '../Section';

describe('Section', () => {
    const wrapper = shallow(<Section />);
    const wrapperWithChildren = shallow(<Section><p>Foo</p></Section>);

    it('renders with default props', () => {
        expect(
            toJSON(wrapper)
        ).toMatchSnapshot()
    })

    it('renders textAlign prop', () => {
        wrapper.setProps({
            textAlign: 'center'
        })

        expect(toJSON(wrapper)).toMatchSnapshot()
    })

    it('renders its children', () => {
        expect(toJSON(wrapperWithChildren)).toMatchSnapshot()
    })

    it('renders its children with Spacer component', () => {
        wrapperWithChildren.setProps({
            spacer: {
                type: 'topbottom',
                value: 4
            }
        })
        expect(toJSON(wrapperWithChildren)).toMatchSnapshot()
    })
})