import React, {Component} from 'react';
require('./index.css');

export default class NavItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {navClassName, navText, itemClick} = this.props;
        return (
            <div className={"navItem "+navClassName} onClick={itemClick}>
                {navText}
            </div>
        );
    }
}