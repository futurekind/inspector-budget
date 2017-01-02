import React, { PropTypes } from 'react'
import styled from 'styled-components';
import { colors, rgba } from '../../utils/styles'

const View = styled.div`

`

const Backdrop = styled.div`
    width: 100%;
    height: 100%;
    position: ${({open}) => open ? 'fixed' : 'absolute'};
    left: ${({open}) => open ? 0 : '-9999px'};
    top: 0;
    z-index: 10;
    opacity: ${({open}) => open ? 1 : 0};
    background: ${rgba(colors.dark, .5)};
    transition: opacity .5s;
`

const Body = styled.div`
    max-width: 600px;
    max-height: 80vh;
    position: ${({open}) => open ? 'fixed' : 'absolute'};
    top: 0;
    left: 0;
`

const Dialog = ({
    open,
    onRequestClose
}) => {
    return (
        <View>
            <Backdrop open={ open } onClick={ onRequestClose } />
        </View>
    )
}

Dialog.defaultProps = {
    onRequestClose: () => {}
}

Dialog.propTypes = {
    open: PropTypes.bool,
    onRequestClose: PropTypes.func,
}

export default Dialog