import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import * as applicationSelectors from '../redux/selectors/application';
import { saveStateToServer } from '../redux/actions/application'
import 'normalize.css/normalize.css';
import Navigation from './common/Navigation';
import NavigationBtn from './common/NavigationBtn';
import Footer from './common/Footer';

const View = styled.div`
    width: 100%;
    height: calc(100vh - 20px);
    display: flex;
    flex-wrap: wrap;
`

const Aside = styled.aside`
    width: 90px;
    height: 100%;
`

const Main = styled.main`
    height: 100%
    display: flex;
    flex: 1;
`

const TransitionHelper = styled.div`
    flex: 1;
`

export class App extends Component {

    constructor(props) {
        super(props);

        this.handleNavigationItemClick = this.handleNavigationItemClick.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount () {
        document.addEventListener('keydown', this.handleSave)
    }
    
    componentWillUnmount () {
        document.removeEventListener('keydown', this.handleSave)
    }
    
    render () {
        const { activeNavigationIndex, children, location, dirty, lastSave } = this.props;
        
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
                    <ReactCSSTransitionGroup
                        component={ TransitionHelper } 
                        transitionName="page"
                        transitionEnterTimeout={500} 
                        transitionLeaveTimeout={500}
                    >
                        { React.cloneElement(children, { key: location.pathname }) }
                    </ReactCSSTransitionGroup>
                    
                </Main>
                <Footer
                    items={[
                        `Last save: ${lastSave || '-'}`,
                        dirty > 0 
                            ? `${dirty} Updates`
                            : 'up to date'
                    ]}
                />
            </View>
        )
    }

    handleNavigationItemClick(index, props) {
        const { to } = props;
        const { router } = this.props;

        router.push(to);
    }

    handleSave(e) {
        const { metaKey, keyCode } = e;
        const { dispatch } = this.props;

        if(metaKey && keyCode === 83) {
            e.preventDefault();
            dispatch(saveStateToServer())
        }
    }

}

const mapState = state => {
    return {
        activeNavigationIndex: applicationSelectors.getNavIndex(state),
        dirty: applicationSelectors.getDirty(state),
        lastSave: applicationSelectors.getLastSave(state)
    }
}

export default withRouter(connect(mapState)(App))