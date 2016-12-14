import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { setNavIndex } from '../../redux/actions/application';

const View = styled.section`
    padding: 24px;

    &.page-appear,
    &.page-enter {
        transform: translateX(100%);
    }

    &.page-leave-active {
        transform: translateX(100%);
        transition: transform .5s ease-in;
    }

    &.page-appear-active,
    &.page-enter-active {
        transform: none;
        transition: transform .5s ease-out;
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

        componentWillUnmount () {
            const { dispatch } = this.props;
            dispatch(setNavIndex(-1))
        }
        

        render () {
            return (
                <View>
                    <Comp {...this.props} />
                </View>
            )
        }
    }

    return connect(mapState)(Page)
}