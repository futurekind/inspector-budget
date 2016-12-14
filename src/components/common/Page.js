import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { setNavIndex } from '../../redux/actions/application';

const View = styled.section`
    padding: 24px;
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
            // const { dispatch } = this.props;
            // dispatch(setNavIndex(-1))
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