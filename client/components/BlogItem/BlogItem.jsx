import React, {Component} from 'react';
import NavLink from '../NavLink/NavLink';
import {browserHistory} from 'react-router';
import {dateFormat} from '../../utils/util';
require('./index.css');

export default class BlogItem extends Component {
    constructor(props) {
        super(props);
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
                <li className='blogItem'>
                    <NavLink to={'/blog/' + blogData.id}>
                        <h1>{blogData.title}</h1>
                        <p className='blogContent'>{blogData.plaintext}</p>
                        <p className='blogInfo'>
                            {dateFormat(blogData.publishDate)+'发布'} | {blogData.author}
                        </p>
                    </NavLink>
                    { showEdit ? <span className="editButton" onClick={this.editButtonClick.bind(this)}>编辑</span> : null }
                </li>
        );
    }
}