import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import * as Actions from '../../actions/Blogs';
import * as commentActions from '../../actions/Comments';
import Comment from '../../components/Comment/Comment';
import ReadEditor from '../../components/ReadEditor/ReadEditor';
import Icon from '../../components/Icon/Icon';
import {isEmptyObject} from '../../utils/util';
require('./index.css');

class BlogContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content:''
        };
        this.backClick = (event)=>this._backClick(event);
    }

    _backClick(event){
        browserHistory.push('/');
    }

    render() {
        let {blogContent, comments, commentActions, login} = this.props;
        return (
            <div className="blogContentWrap container">
                <div className="backButton" onClick={this.backClick}>
                    <Icon type="back" className="backIcon"/>
                    <span className="backText">返回</span>
                </div>
                <h1 className="blogTitle">{blogContent['title']}</h1>
                <p className="authorInfo">
                    作者：{blogContent['author']}
                    <span className="spliter"></span>
                    浏览量：{blogContent['count']}
                </p>
                <ReadEditor id={this.props.id} content={blogContent['content']}/>
                <div className="comment">
                    <Comment comments={comments} blogId={blogContent['_id']} commentActions={commentActions} isLogin={login.is_login}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        blogs: state.blogs.blogs,
        blogContent: state.blogs.blog,
        comments: state.comments.comments,
        login: state.login,
        id:'blogContent'
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
        commentActions:bindActionCreators(commentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogContent);