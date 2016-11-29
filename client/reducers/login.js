/**
 * Created by wyf on 2016/10/29.
 */
import {LOGIN_SUCCESS, LOGIN_FAIL,LOG_OUT, SHOW_LOGIN_DIALOG, HIDE_LOGIN_DIALOG} from '../constants/LoginActions';
const initState = {
    is_login:false,
    authCookie:'',
    showLoginDialog: false
};

function loginSuccess(state, authCookie){
    "use strict";
    return Object.assign({}, state, {is_login:true, authCookie:authCookie, showLoginDialog:false});
}

function logOut(state) {
    return Object.assign({},state,initState);
}

function showLoginDialog(state) {
    return Object.assign({},state,{showLoginDialog:true});
}

function hideLoginDialog(state) {
    return Object.assign({},state,{showLoginDialog:false});
}

export default function login(state=initState, action){
    switch (action.type){
        case LOGIN_SUCCESS:
            return loginSuccess(state, action['authCookie']);
        case LOGIN_FAIL:
            return state;
        case LOG_OUT:
            return logOut(state);
        case SHOW_LOGIN_DIALOG:
            return showLoginDialog(state);
        case HIDE_LOGIN_DIALOG:
            return hideLoginDialog(state);
        default:
            return state;
    }
}