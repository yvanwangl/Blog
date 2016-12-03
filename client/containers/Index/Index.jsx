import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/Resume';
import * as NavActions from '../../actions/Nav';
import Icon from '../../components/Icon/Icon';
import Resume from '../Resume/Resume';
import NavItem from '../../components/NavItem/NavItem';
import ListButton from '../../components/ListButton/ListButton';
import LoginDialog from '../../components/LoginDialog/LoginDialog';
import {browserHistory} from 'react-router';
require('./index.css');

let NavItems = [
    {
        navText:'全部',
        blogType:'all'
    },
    {
        navText:'设计',
        blogType:'design'
    },
    {
        navText:'前端',
        blogType:'develop'
    }
];

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter:'all',
            currentPage:'index'
        };
        this.openResumeClick = (event)=> this._openResumeClick(event);
        this.openAdminClick = (event)=> this._openAdminClick(event);
        this.navItemClick = (blogType)=> this._navItemClick(blogType);
    }

    _openResumeClick(event){
        let {actions, resumeInfo} = this.props;
        if(resumeInfo.showResume){
            actions.hideResume();
        }else {
            actions.showResume();
        }
    }

    _openAdminClick(event){
        if(this.state.currentPage=='index'){
            browserHistory.push('/admin');
            this.setState({
                currentPage:'admin'
            });
        }else {
            browserHistory.push('/');
            this.setState({
                currentPage:'index'
            });
        }
    }

    _navItemClick(blogType){
        let {navActions} = this.props;
        navActions.filterBlog(blogType);
        this.setState({
            filter:blogType,
            currentPage:'index'
        });
        browserHistory.push('/');
        console.log(blogType);
    }

    render() {
        let {resumeInfo, login} = this.props;
        let navItems = [];
        NavItems.map((nav, index)=>
            navItems.push(
                <NavItem
                    key={index}
                    navText={nav.navText}
                    itemClick={()=>{this.navItemClick(nav.blogType)}}
                    navClassName={this.state.filter==nav.blogType?'show':''}
                />
            )
        );
        return (
            <div className="indexPage">
                <div className="topBar"></div>
                <div className="navList">
                    <div className="navWrap">
                        {navItems}
                    </div>
                </div>
                {
                    login.is_login?
                    <div className="adminButton" onClick={this.openAdminClick}>
                        <Icon type={this.state.currentPage=='index'?"feather":"back"} className="featherIcon"/>
                    </div>
                    :null
                }
{/*                <div className="openResume" onClick={this.openResumeClick}>
                    <Icon type="list" className="resumeIcon"/>
                </div>*/}
                <ListButton listClassName={resumeInfo.showResume?'close':'list'} onButtonClick={this.openResumeClick}/>
                <Resume />
                {login.showLoginDialog? <LoginDialog />:null}
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        resumeInfo: state.resume,
        login: state.login
    };
}

function mapActionsToProps(dispatch){
    return {
        actions: bindActionCreators(Actions, dispatch),
        navActions: bindActionCreators(NavActions, dispatch)
    };
}

export default connect(mapStateToProps, mapActionsToProps)(Index);