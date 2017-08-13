/**
 * Created by Yvan on 2017/8/13.
 */
import fetch from 'isomorphic-fetch';
const {httpServer, defaultOptions} = require('../../system.config');

function checkStatus(response){
    "use strict";
    let responseStatus = response.status;
    if(responseStatus>=200 && responseStatus<300){
        return response;
    }
    const error = new Error(`Response error with status: ${response.statusText}`);
    error.response = response;
    throw error;
}

function parseJSON(response) {
    return response.json();
}

export default function request(url, options){
    return fetch(`${httpServer}${url}`, {
        ...defaultOptions,
        ...options
    })
        .then(checkStatus)
        .then(parseJSON)
        .catch(error=> {
            console.log(error);
            return {error};
        })
}