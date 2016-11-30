import React, {Component} from 'react';
import Icon from '../Icon/Icon';
require('./index.css');

export default class SkillItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="skillItem">
                <Icon type="skill" className="skillIcon"/>
                <span className="skillName">{this.props.skillName}</span>
            </div>
        );
    }
}