import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { colors, sizes, noise } from '../../utils/styles';

const activeIndicatorFactor = sizes.navigationWidth / 2;

const View = styled.nav`
    height: 100%;
    position: relative;
    background-color: ${colors.dark};
    ${noise()}

    &:after {
        content: "";
        marginTop: -10px;
        border: 10px solid transparent;
        border-right-color: #fff;
        position: absolute;
        top: 0;
        right: 0;
        transform: translateY(${(props) => 
            activeIndicatorFactor + (props.activeIndex * sizes.navigationWidth)}px);
        transition: transform .2s;
    }
`;

const composeChildren = (children, props) => {
    if(!children) return null;
    
    const Component = (comp, props, key) => <comp.type key={key} {...comp.props} onClick={() => props.onItemClick(key, comp.props)} />
    
    if(children.map)
        return children.map((child, i) => Component(child, props, i))
        
    return Component(children, props, 0);

}

const Navigation = ({
    activeIndex,
    children,
    onItemClick
}) => {
    return (
        <View activeIndex={ activeIndex }>
            { composeChildren(children, {
                onItemClick
            }) }
        </View>
    )
}

Navigation.defaultProps = {
    onItemClick: (index) => console.log(index)
}

Navigation.propTypes = {
    activeIndex: PropTypes.number.isRequired,
    onItemClick: PropTypes.func,
}

export default Navigation