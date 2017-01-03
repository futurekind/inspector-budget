import React, { PropTypes } from 'react';
import { sizes } from '../../utils/styles';

const getStyle = props => {
    switch(props.type) {
        case 'topbottom':
            return {
                paddingTop: props.value * sizes.spacer,
                paddingBottom: props.value * sizes.spacer
            }

        case 'top':
            return {
                paddingTop: props.value * sizes.spacer,
            }

        case 'bottom':
            return {
                paddingBottom: props.value * sizes.spacer
            }
    }
}

const Spacer = (props) => {
    return (
        <div style={ getStyle(props) }>
            { props.children }
        </div>
    )
}

Spacer.defaultProps = {
    type: 'topbottom',
    value: 4
}

Spacer.propTypes = {
    type: PropTypes.oneOf([
        'topbottom', 'top', 'bottom'
    ]),
    value: PropTypes.oneOf([
        0, 1, 2, 3, 4, 5, 6, 7, 8
    ])
}

export default Spacer