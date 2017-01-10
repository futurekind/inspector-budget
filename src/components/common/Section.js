import React, { PropTypes } from 'react'
import styled from 'styled-components';
import Spacer from './Spacer'

const View = styled.section`
    text-align: ${props => props.textAlign};
`

const renderChildren = ({
    children,
    spacer
}) => {

    if(spacer) {
        return <Spacer {...spacer}>{ children }</Spacer>
    }

    return children
}

const Section = ({
    textAlign,
    children,
    spacer
}) => {

    return (
        <View textAlign={ textAlign }>
            { renderChildren({children, spacer}) }
        </View>
    )
}

Section.defaultProps = {
    textAlign: 'left'
}

Section.propTypes = {
    spacer: PropTypes.shape({
        type: PropTypes.oneOf([
            'topbottom', 'top', 'bottom'
        ]),
        value: PropTypes.oneOf([
            0, 1, 2, 3, 4, 5, 6, 7, 8
        ])
    }),
    textAlign: PropTypes.oneOf([
        'left', 'right', 'center'
    ]),
}

export default Section