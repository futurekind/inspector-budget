import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as applicationSelectors from '../redux/selectors/application';
import { setNavIndex } from '../redux/actions/application';
import 'normalize.css/normalize.css';
import Navigation from './common/Navigation';
import NavigationBtn from './common/NavigationBtn';

const View = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
`

const Aside = styled.aside`
    width: 90px;
    height: 100%;
`

const Main = styled.main`
    height: 100%;
    overflow-y: auto;
`

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeNavigationIndex: 0
        }

        this.handleNavigationItemClick = this.handleNavigationItemClick.bind(this);
    }
    
    render () {
        const { activeNavigationIndex } = this.props;

        return (
            <View>
                <Aside>
                    <Navigation
                        activeIndex={ activeNavigationIndex }
                        onItemClick={ this.handleNavigationItemClick }
                    >
                        <NavigationBtn>One</NavigationBtn>
                        <NavigationBtn>Two</NavigationBtn>
                        <NavigationBtn>Three</NavigationBtn>
                    </Navigation>
                </Aside>
                <Main></Main>
            </View>
        )
    }

    handleNavigationItemClick(index) {
        const { dispatch } = this.props;

        dispatch(setNavIndex(index))
    }

}

const mapState = state => {
    return {
        activeNavigationIndex: applicationSelectors.getNavIndex(state)
    }
}

export default connect(mapState)(App)