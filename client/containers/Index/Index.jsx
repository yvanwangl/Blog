import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/Resume';
import Icon from '../../components/Icon/Icon';
import Resume from '../Resume/Resume';
import {browserHistory} from 'react-router';
require('./index.css');

class Index extends Component {

    constructor(props) {
        super(props);
        this.openResumeClick = (event)=> this._openResumeClick(event);
    }

    _openResumeClick(event){
        let {actions} = this.props;
        actions.showResume();
    }

    render() {
        return (
            <div className="indexPage">
                <div className="openResume" onClick={this.openResumeClick}>
                    <Icon type="list" className="resumeIcon"/>
                </div>
                <Resume />
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        resumeInfo: state.resume
    };
}

function mapActionsToProps(dispatch){
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapActionsToProps)(Index);