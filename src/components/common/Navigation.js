import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { colors, sizes } from '../../utils/styles';

const activeIndicatorFactor = sizes.navigationWidth / 2;

const View = styled.nav`
    height: 100%;
    position: relative;
    background-color: ${colors.dark};

    &:after {
        content: "";
        marginTop: -10px;
        border: 10px solid transparent;
        border-left-color: ${colors.dark};
        position: absolute;
        top: 0;
        right: -20px;
        transform: translateY(${(props) => 
            activeIndicatorFactor + (props.activeIndex * sizes.navigationWidth)}px);
    }
`;

const Navigation = ({
    activeIndex,
    children
}) => {
    return (
        <View activeIndex={ activeIndex }>
            { children }
        </View>
    )
}

Navigation.propTypes = {
    activeIndex: PropTypes.number.isRequired
}

export default Navigation