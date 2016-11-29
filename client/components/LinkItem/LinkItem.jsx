import React, {Component} from 'react';
import Icon from '../Icon/Icon';
import NavLink from '../NavLink/NavLink';
require('./index.css');

export default class LinkItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a className="linkItem" href={this.props.target} target="_blank">
                <Icon type={this.props.iconType} className="skillIcon"/>
            </a>
        );
    }
}