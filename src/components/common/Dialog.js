import React, { PropTypes } from 'react'
import styled from 'styled-components';
import { colors, rgba } from '../../utils/styles'

const View = styled.div`
    position: ${({open}) => open ? 'absolute' : 'static'};
    left: -9999px;
    pointer-events: ${({open}) => open ? 'all' : 'none'};
`

const Backdrop = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    opacity: ${({open}) => open ? 1 : 0};
    background: ${rgba(colors.dark, .5)};
    transition: opacity .5s;
`

const Content = styled.div`
    width: 100%;
    max-width: 800px;
    height: 80vh;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 50%;
    z-index: 11;
    transform: ${({open}) => 
        open ? 'translate(-50%, 10vh)' : 'translate(-50%, -100%)'
    };
    background: #fff;
    transition: transform .25s .25s;
`

const Title = styled.h1`
    margin: 0;
    padding: 12px 24px;
    background: ${colors.highlight}
    font-size: 22px;
    color: #fff;
`

const Body = styled.div`
    padding: 12px 24px;
    flex: 1;
    overflow-y: auto;
`

const Dialog = ({
    open,
    onRequestClose,
    title,
    children
}) => {
    return (
        <View open={ open }>
            <Backdrop open={ open } onClick={ onRequestClose } />
            <Content open={ open }>
                { title && <Title>{ title }</Title> }
                <Body>{ children }</Body>
            </Content>
        </View>
    )
}

Dialog.defaultProps = {
    onRequestClose: () => {}
}

Dialog.propTypes = {
    open: PropTypes.bool,
    onRequestClose: PropTypes.func,
    title: PropTypes.string,
}

export default Dialog