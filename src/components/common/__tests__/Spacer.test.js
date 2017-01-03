import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { sizes } from '../../../utils/styles'
import Spacer from '../Spacer';

describe('Spacer', () => {
    const wrapper = shallow(<Spacer />);
    
    it('renders as excepted', () => {
        expect(toJSON(wrapper)).toMatchSnapshot();
    })

    it('renders its children', () => {
        const wrapper = shallow(<Spacer><p>some text</p></Spacer>);
        expect(toJSON(wrapper)).toMatchSnapshot();
    })

    it('renders just top space when type prop is set', () => {
        wrapper.setProps({
            type: 'top'
        })
        const style = wrapper.prop('style');   

        expect(style.paddingBottom).not.toBeDefined();
    })

    it('renders just bottom space when type prop is set', () => {
        wrapper.setProps({
            type: 'bottom'
        })
        const style = wrapper.prop('style');   
        
        expect(style.paddingTop).not.toBeDefined();
    })
    
    it('calculates the paddingTop and paddingBottom values correctly', () => {
        wrapper.setProps({
            value: 2,
            type: 'topbottom'
        })
        const style = wrapper.prop('style');

        expect(style.paddingTop).toBe(sizes.spacer * 2)
        expect(style.paddingBottom).toBe(sizes.spacer * 2)
    })

    it('calculates the paddingTop value correctly', () => {
        wrapper.setProps({
            value: 8,
            type: 'top'
        })
        const style = wrapper.prop('style');

        expect(style.paddingTop).toBe(sizes.spacer * 8)
    })

    it('calculates the paddingBottom value correctly', () => {
        wrapper.setProps({
            value: 3,
            type: 'bottom'
        })
        const style = wrapper.prop('style');

        expect(style.paddingBottom).toBe(sizes.spacer * 3)
    })

})