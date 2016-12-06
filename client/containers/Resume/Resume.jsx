'use strict';

import React, {Component} from 'react';
/*import ReactCSSTransitionGroup from 'react-addons-css-transition-group';*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/Resume';
import * as LogActions from '../../actions/Login';
import avatarFei  from './images/fei.png';
import avatarHuan  from './images/huanimg.jpg';
import NavLink from '../../components/NavLink/NavLink';
import SkillItem from '../../components/SkillItem/SkillItem';
import LinkItem from '../../components/LinkItem/LinkItem';
import Icon from '../../components/Icon/Icon';
import {browserHistory} from 'react-router';
require ('./index.css');
require ('./images/logo.jpg');

class Resume extends Component {
	constructor(props) {
        super(props);
/*        this.state = {
            bindScroll:false
        };*/
        this.hideResume = (event)=>this._hideResume(event);
        this.logClick = (event)=>this._logClick(event);
    }

    _hideResume(event){
        let {actions} = this.props;
        actions.hideResume();
    }

    _logClick(event){
        const {login, logActions} = this.props;
        if(login.is_login){
            logActions.logOut();
            browserHistory.push('/');
        }else {
            logActions.showLoginDialog();
        }
    }

	/*onHoverEvent(event){
	    let windowHeight = window.innerHeight;
	    let halfWindowHeight = windowHeight/2;
        let pageY = event.pageY;
        let resumeContianer = this.refs.resumeContianer;
        let resumeContianerHeight = resumeContianer.scrollHeight;
        let diffHeight = resumeContianerHeight-windowHeight;
        if(pageY>halfWindowHeight){
            resumeContianer.style.top = -diffHeight+"px";
        }else {
            resumeContianer.style.top = 0;
        }
	}*/

	/*componentWillReceiveProps(nextProps){
	    let {resumeInfo} = nextProps;
        let $ = window.jQuery;
        function handler(){
            $(window).scrollTop(0);
        }
        if(resumeInfo.showResume){
            $(window).scrollTop(0);
            $(window).on('scroll', handler);
        }else {
            $(window).off('scroll', handler);
        }
    }*/

	render(){
		const { resumeInfo,login, actions } = this.props;
        let rootClassName = resumeInfo.showResume? 'rootContainer showResume':'rootContainer';
        let skillItems = [];
        let linkItems = [];
        resumeInfo.skills.map((skill, index)=>skillItems.push(<SkillItem key={index} skillName={skill.name}/>));
        resumeInfo.links.map((link, index)=>linkItems.push(<LinkItem key={index} iconType={link.name} target={link.target}/>));
        return (
			<div className={rootClassName}>
                <div className="resumeWrap">
                    <div className="linearContainer"></div>
                    <div className="resumeContianer" ref="resumeContianer" >
                        <img src={resumeInfo.page=='huan'?avatarHuan:avatarFei} alt="me"/>
                        <h1 className='resumeTitle'>{resumeInfo.resumeTitle}</h1>
                        <p className='personalInfo'>{resumeInfo.personalInfo}{resumeInfo.page=='huan'?'':<a href="http://www.yvanwang.com" className="personPage">个人网站</a>}</p>
                        {/*<p className="currentState">{resumeInfo.currentState}</p>*/}
                        <div className="skillContainer">
                            {skillItems}
                        </div>
                        <div className="linkContainer">
                            {linkItems}
                        </div>
                       {/* <div className="buttons">
                            <NavLink className="indexPage button" to='/'>首页</NavLink>
                            <NavLink className="login button" onClick={this.logClick.bind(this)}>{login.is_login?'退出':'登录'}</NavLink>
                        </div>*/}
                    </div>
                    <span className="loginContainer" onClick={this.logClick}>
                        <Icon type={login.is_login?'logout':'login'} className="logIcon"/>
                    </span>
                    {/*<span className="closeContainer" onClick={this.hideResume}>
                        <Icon type="close" className="closeIcon"/>
                    </span>*/}
                </div>
			</div>

		);
	}
}

function mapStateToProps(state) {
	return {
		resumeInfo: state.resume,
        login:state.login
	};
}

function mapActionsToProps(dispatch){
	return {
		actions: bindActionCreators(Actions, dispatch),
        logActions:bindActionCreators(LogActions, dispatch)
	};
}

export default connect(mapStateToProps, mapActionsToProps)(Resume);