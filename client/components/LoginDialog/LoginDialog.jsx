import React, { Component } from 'react';
import * as Actions from '../../actions/Login';
import * as ResumeActions from '../../actions/Resume';
import {initBlogList} from '../../actions/Blogs';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import Icon from '../../components/Icon/Icon';
import NavLink from '../NavLink/NavLink';
require ('./index.css');

class LoginDialog extends Component {
    constructor(props){
        super(props);
        this.state={
            userName:'',
            pass:''
        };
        this.setUserName = (event)=>this._setUserName(event);
        this.setPass = (event)=>this._setPass(event);
        this.handleSubmit = (event)=>this._handleSubmit(event);
        this.cancelClick = (event)=>this._cancelClick(event);
    }

    _setUserName(event){
        this.setState({
            userName:event.target.value
        });
    }

    _setPass(event){
        this.setState({
            pass:event.target.value
        });
    }

    _handleSubmit(e){
        "use strict";
        let {login, actions, resumeActions, initBlogList} = this.props;
        var values = {
            userName:this.state.userName,
            pass:this.state.pass
        };
        e.preventDefault();
        console.log('React form of values:', values);
        if(!login.is_login){
            actions.login(values, ()=>{
                console.log('callback 成功');
                actions.hideLoginDialog();
                resumeActions.hideResume();
                initBlogList(true, 'all', 1);
                browserHistory.push('/');
            });
        }
    }

    _cancelClick(event){
        let {actions} = this.props;
        actions.hideLoginDialog();
        browserHistory.push('/');
    }

    render() {
        const {login, actions} = this.props;
        return (
            <div className="dialogModel">
                <div className="loginWrapper">
                    <h2 className="loginTitle">Blog 登录</h2>
                    <form>
                        <div className="userName">
                            <Icon type="user" className="userIcon"/>
                            <input type="text" placeholder="请输入用户名" name="userName" value={this.state.userName} onChange={this.setUserName}/>
                        </div>
                        <div className="pass">
                            <Icon type="pass" className="passIcon"/>
                            <input type="password" placeholder="请输入密码" name="pass" value={this.state.pass} onChange={this.setPass}/>
                        </div>
                        <div className="buttonArea">
                            <span className="loginButton" onClick={this.handleSubmit}>确定</span>
                        </div>
                        <div className="closeButton" onClick={this.cancelClick}>
                            <Icon type="close" className="closeIcon"/>
                        </div>
                     </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        login:state.login
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions:bindActionCreators(Actions,dispatch),
        resumeActions:bindActionCreators(ResumeActions,dispatch),
        initBlogList:bindActionCreators(initBlogList, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);
