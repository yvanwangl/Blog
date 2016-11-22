import React, { Component } from 'react';
import * as Actions from '../../actions/Login';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
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
        let {login, actions} = this.props;
        var values = {
            userName:this.state.userName,
            pass:this.state.pass
        };
        e.preventDefault();
        console.log('React form of values:', values);
        if(!login.is_login){
            actions.login(values, ()=>{
                console.log('callback 成功');
                browserHistory.push('/admin');
            });
        }
    }

    _cancelClick(event){
        browserHistory.push('/');
    }

    render() {
        const {login, actions} = this.props;
        return (
            <div className="dialogModel">
                <div className="loginWrapper">
                    <form>
                        <div className="userName">
                            <label htmlFor="userName">用户名：</label>
                            <input type="text" placeholder="请输入用户名" name="userName" value={this.state.userName} onChange={this.setUserName}/>
                        </div>
                        <div className="pass">
                            <label htmlFor="pass">密码：</label>
                            <input type="password" placeholder="请输入密码" name="pass" value={this.state.pass} onChange={this.setPass}/>
                        </div>
                        <div className="buttonArea">
                            <button className="loginButton" onClick={this.handleSubmit}>确定</button>
                            <button className="loginButton" onClick={this.cancelClick}><NavLink to="/">取消</NavLink></button>
                        </div>
                     </form>
                </div>
            </div>
        );
    }
}

/*let LoginForm = React.createClass({

    handleSubmit(e){
        "use strict";
        let {login, actions} = this.props;
        var values = this.props.form.getFieldsValue();
        e.preventDefault();
        console.log('React form of values:', values);
        if(!login.is_login){
            actions.login(values, ()=>{
                console.log('callback 成功');
                browserHistory.push('/admin');
            });
        }
    },

    render() {
        const {login, actions} = this.props;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout={
            labelCol:{
                span:6
            },
            wrapperCol:{
                span:14
            }
        };

        return (
            <div className="dialogModel">
                <div className="loginWrapper">
                    {/!*<Form horizontal onSubmit={this.handleSubmit}>
                        <FormItem {...formItemLayout} label="用户名：">
                            {
                                getFieldDecorator('userName')(<Input type='text' placeholder="请输入用户名"/>)
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="密码：">
                            {
                                getFieldDecorator('pass')(<Input type='password' placeholder="请输入密码"/>)
                            }
                        </FormItem>
                        <FormItem wrapperCol={{span: 24, offset:0}} style={{marginTop:24, textAlign:'center'}}>
                            <Button type="primary" htmlType='submit' className="loginButton">确定</Button>
                            <Button type="primary" htmlType='button' className="loginButton"><NavLink to="/">取消</NavLink></Button>
                        </FormItem>
                    </Form>*!/}
                </div>
            </div>
        );
    },
});*/

function mapStateToProps(state){
    return {
        login:state.login
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions:bindActionCreators(Actions,dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);
