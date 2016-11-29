/**
 * Created by wyf on 2016/10/29.
 */
import {LOGIN_SUCCESS, LOGIN_FAIL,LOG_OUT, SHOW_LOGIN_DIALOG, HIDE_LOGIN_DIALOG} from '../constants/LoginActions';
import fetch from 'isomorphic-fetch';

export function login(values, callback) {
    return (dispatch)=>{
        "use strict";
        fetch('/login',{
            method:'POST',
            mode:'cors',
            Origin:'*',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(values)
        })
            .then(response=>response.json())
            .then(json=>{
                if(json.is_success){
                    dispatch(loginSuccess(json.authCookie));
                    callback();
                }else {
                    dispatch(loginFail());
                }
            })
            .catch(e=>console.log(e));
    }
}

export function loginSuccess(authCookie){
    return {
        type:LOGIN_SUCCESS,
        authCookie
    }
}

export function loginFail(){
    return {
        type:LOGIN_FAIL
    }
}

export function logOut(){
    return {
        type:LOG_OUT
    }
}

export function showLoginDialog(){
    return {
        type:SHOW_LOGIN_DIALOG
    }
}

export function hideLoginDialog(){
    return {
        type:HIDE_LOGIN_DIALOG
    }
}