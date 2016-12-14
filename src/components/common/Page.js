import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { setNavIndex } from '../../redux/actions/application';

const View = styled.section`
    padding: 24px;

    &.page-enter {
        transform: translateY(-100%);
        position: absolute;
        top: 0;
        opacity: 0;
    }

    &.page-enter-active {
        transform: none;
        position: relative;
        opacity: 1;
        transition: all .5s ease-out;
    }

    &.page-leave {
        position: absolute;
        top: 0;
    }

    &.page-leave-active {
        opacity: 0
        transform: translateY(50%);
        transition: all .2s ease-in;
    }
`;

const mapState = state => {
    return {}
}

export const createPageHandler = (Comp, props = {}) => {
    class Page extends Component {

        componentDidMount() {
            const { navIndex } = props;
            const { dispatch } = this.props;

            dispatch(setNavIndex(navIndex))
        }
        

        render () {
            return (
                <View key={props.navIndex}>
                    <Comp {...this.props} />
                </View>
            )
        }
    }

    return connect(mapState)(Page)
}