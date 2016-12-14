import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router';

import * as applicationSelectors from '../redux/selectors/application';
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
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
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
        const { activeNavigationIndex, children } = this.props;
        
        return (
            <View>
                <Aside>
                    <Navigation
                        activeIndex={ activeNavigationIndex }
                        onItemClick={ this.handleNavigationItemClick }
                    >
                        <NavigationBtn
                            to="/accounts" 
                            icon="store" 
                            active={ activeNavigationIndex === 0 }
                        >Accounts</NavigationBtn>
                        <NavigationBtn
                            to="/budgets" 
                            icon="store" 
                            active={ activeNavigationIndex === 1 }
                        >Budgets</NavigationBtn>
                    </Navigation>
                </Aside>
                <Main>
                    { children }
                </Main>
            </View>
        )
    }

    handleNavigationItemClick(index, props) {
        const { to } = props;
        const { router } = this.props;

        router.push(to);
    }

}

const mapState = state => {
    return {
        activeNavigationIndex: applicationSelectors.getNavIndex(state)
    }
}

export default withRouter(connect(mapState)(App))