import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { colors, sizes, noise } from '../../utils/styles';

const activeIndicatorFactor = sizes.navigationWidth / 2;

const View = styled.nav`
    height: 100%;
    border-radius: 3px;
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

const composeChildren = (_children, props) => {
    return _children.map((child, i) => 
        <child.type key={i} {...child.props} onClick={() => props.onItemClick(i)} />
    );
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