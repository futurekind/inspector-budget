import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import PageHeading from '../PageHeading';

describe('PageHeading', () => {

    it('renders correctly', () => {
        const wrapper = shallow(<PageHeading />)
        expect(toJSON(wrapper)).toMatchSnapshot()
    })

    it('renders its children', () => {
        const wrapper = shallow(<PageHeading>Some Heading</PageHeading>)
        expect(toJSON(wrapper)).toMatchSnapshot()
    })

})