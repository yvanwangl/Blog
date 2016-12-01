import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Blogs';
import NavLink from '../NavLink/NavLink';
import {browserHistory} from 'react-router';
import {dateFormat} from '../../utils/util';
require('./index.css');

export default class BlogItem extends Component {
    constructor(props) {
        super(props);
        this.itemClick = (event)=>this._itemClick(event);
    }

    _itemClick(event){
        let {loadBlogData, blogData} = this.props;
        loadBlogData(blogData['_id'], blogData['count']+1, ()=>{
            browserHistory.push(`/blog/${blogData['id']}`);
        });
    }

    editButtonClick (){
        const {blogData, loadBlogData} = this.props;
        loadBlogData(blogData['_id'],()=>{
            browserHistory.push("/admin/"+blogData.id);
        });

    }

    render() {
        const {blogData, showEdit} = this.props;
        return (
                <li className='blogItem' onClick={this.itemClick}>
                    <div>
                        <h1>{blogData.title}</h1>
                        <p className='blogContent'>{blogData.plaintext}</p>
                        <p className='blogInfo'>
                            {dateFormat(blogData.publishDate)+'发布'} | {blogData.author}
                        </p>
                    </div>
                    { showEdit ? <span className="editButton" onClick={this.editButtonClick.bind(this)}>编辑</span> : null }
                </li>
        );
    }
}