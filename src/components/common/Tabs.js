import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { sizes, colors, rgba } from '../../utils/styles';

const View = styled.ul`
    margin: 0;
    padding: 0;
    border-bottom: 1px solid ${rgba(colors.light, .3)};
    position: relative;
    list-style: none;
    white-space: nowrap;
    overflow-x: auto;
`

const Indicator = styled.span`
    height: 3px;
    width: 100px;
    background: ${colors.highlight};
    position: absolute;
    bottom: 0;
    left: 0;
`

const Item = styled.li`
    padding-left: ${sizes.spacer * 2}px;
    padding-right: ${sizes.spacer * 2}px;
    padding-top: ${sizes.spacer}px;
    padding-bottom: ${sizes.spacer}px;
    display: inline-block;
    cursor: pointer;
`

const getIndicatorStyle = (items, selecedIndex) => {
    if(!items[selecedIndex]) return {};

    const bcr = items[selecedIndex].getBoundingClientRect();
    
    return {
        width: bcr.width
    }
}

class Tabs extends React.Component {
    
    constructor() {
        super();
        this.items = [];
        
        this.state = {
            indicatorStyle: {}
        }
    }

    componentDidMount () {
        const { selecedIndex } = this.props;

        this.setState({
            indicatorStyle: getIndicatorStyle(this.items, selecedIndex)
        })
    }
    

    render() {
        const { children } = this.props;
        const { indicatorStyle } = this.state;

        return (
            <View>
                { [...children].map((child, i) => {
                    return <Item innerRef={
                        item => {
                            this.items = [
                                ...this.items,
                                item
                            ]
                        }
                    } key={ i }>{ child }</Item>;
                }) }
                <Indicator style={ indicatorStyle } />
            </View>
        )
    }
}

const Tab = ({
    children
}) => {
    return <span>{ children }</span>
}

Tabs.defaultProps = {
    selecedIndex: 0
}

Tabs.propTypes = {
    selecedIndex: PropTypes.number,
}

export { Tabs, Tab }