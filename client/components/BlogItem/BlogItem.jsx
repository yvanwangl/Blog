import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Blogs';
import NavLink from '../NavLink/NavLink';
import Icon from '../Icon/Icon';
import {browserHistory} from 'react-router';
import {dateFormat} from '../../utils/util';
require('./index.css');

export default class BlogItem extends Component {
    constructor(props) {
        super(props);
        this.itemClick = (event)=>this._itemClick(event);
    }

    _itemClick(event) {
        let {loadBlogData, blogData} = this.props;
        loadBlogData(blogData['_id'], blogData['count'] + 1, ()=> {
            browserHistory.push(`/blog/${blogData['_id']}`);
        });
    }

    editButtonClick() {
        const {blogData, editBlogData} = this.props;
        editBlogData(blogData['_id'], ()=> {
            browserHistory.push("/admin/" + blogData['_id']);
        });

    }

    render() {
        const {blogData, showEdit} = this.props;
        return (
            <li className='blogItem'>
                <div onClick={this.itemClick}>
                    <h1>{blogData.title}</h1>
                    <p className='blogContent'>{blogData.plaintext}</p>
                    <p className='blogInfo'>
                        {/*1 的日期格式化为：2016年 12月 05日*/}
                        {/*2 的日期格式化为：2016-12月-05*/}
                        <Icon type="dateIcon" className="dateIcon icon"/>
                        <span className="text">{dateFormat(blogData.publishDate, 2)}</span>
                        <span className="spliter"></span>
                        <Icon type="feather" className="authorIcon icon"/>
                        <span className="text">{blogData.author}</span>
                        <span className="spliter"></span>
                        <Icon type="scaner" className="scanerIcon icon"/>
                        <span className="text">{blogData.count}</span>
                    </p>
                </div>
                { showEdit ? <span className="editButton" onClick={this.editButtonClick.bind(this)}>编辑</span> : null }
            </li>
        );
    }
}
