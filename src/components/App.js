import React, { Component } from 'react';
import styled from 'styled-components';
import 'normalize.css/normalize.css';

const View = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
`

const Aside = styled.aside`
    width: 90px;
    height: 100%;
    background: red;
`

const Main = styled.main`
    height: 100%;
    overflow-y: auto;
`

class App extends Component {
    render () {
        return (
            <View>
                <Aside></Aside>
                <Main></Main>
            </View>
        )
    }
}

export default App