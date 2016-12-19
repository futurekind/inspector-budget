import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { App } from './App';

describe('App', () => {
    const wrapper = shallow(
        <App location={{}} activeNavigationIndex={-1}>
            <h1>Hallo</h1>
        </App>
    );

    it('renders correctly', () => {
        expect(toJSON(wrapper)).toMatchSnapshot()
    })


})