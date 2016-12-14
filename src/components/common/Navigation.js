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

const Button = styled.button`
    width: 100%;
    height: ${sizes.navigationWidth}px;
    border: none;
    border-top: 1px solid ${colors.dark};
    border-bottom: 1px solid ${colors.light};
    display: block;
    position: relative;
    color: #fff;
    background: none;

    span {
        width: 100%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
`

const Navigation = ({
    activeIndex
}) => {
    return (
        <View activeIndex={ activeIndex }>
            <Button><span>1</span></Button>
            <Button><span>2</span></Button>
            <Button><span>3</span></Button>
        </View>
    )
}

Navigation.propTypes = {
    activeIndex: PropTypes.number.isRequired
}

export default Navigation