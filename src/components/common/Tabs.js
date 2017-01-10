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
    transition: left .25s;
`

const Item = styled.li`
    padding-left: ${sizes.spacer * 2}px;
    padding-right: ${sizes.spacer * 2}px;
    padding-top: ${sizes.spacer}px;
    padding-bottom: ${sizes.spacer}px;
    display: inline-block;
    cursor: pointer;
`

const getIndicatorStyle = (items, selectedIndex) => {
    if(!items[selectedIndex]) return {};

    const bcr = items[selectedIndex].getBoundingClientRect();
    
    const left = items.reduce((value, item, i) => {
        
        if(!item) return value;

        const currentBcr = item.getBoundingClientRect();

        if(i >= selectedIndex) return value

        return value + currentBcr.width
        
    }, 0)

    return {
        width: bcr.width,
        left
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
        const { selectedIndex } = this.props;

        this.setState({
            indicatorStyle: getIndicatorStyle(this.items, selectedIndex)
        })
    }
    
    componentWillReceiveProps (nextProps) {
        const { selectedIndex } = this.props;

        if(selectedIndex !== nextProps.selectedIndex) {
            this.setState({
                indicatorStyle: getIndicatorStyle(this.items, nextProps.selectedIndex)
            })
        }
    }
    
    render() {
        const { children, onItemClick } = this.props;
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
                    } key={ i } onClick={ () => onItemClick(i) }>{ child }</Item>;
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
    selectedIndex: 0,
    onItemClick: () => {}
}

Tabs.propTypes = {
    selectedIndex: PropTypes.number,
    onItemClick: PropTypes.func,
}

export { Tabs, Tab }