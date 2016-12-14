import React, {Component} from 'react';
import CommentInput from '../CommentInput/CommentInput';
import CommentItem from '../CommentItem/CommentItem';
import {formatComments} from '../../utils/util';
require('./index.css');

function commentIterator(childComments, commentItems, commentActions, blogId, parentName, showDeleteButton, authCookie){
    if(childComments) {
        childComments.map((childComment)=>{
            commentItems.push(<CommentItem key={childComment['_id']} comment={childComment} blogId={blogId} commentActions={commentActions} parentName={parentName} showDeleteButton={showDeleteButton} authCookie={authCookie}/>)
            if(childComment['children']){
                commentIterator(childComment['children'], commentItems, commentActions, blogId, childComment['name'], showDeleteButton, authCookie);
            }
        });
    }
}

export default class Comment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {comments , commentActions, blogId, isLogin, authCookie} = this.props;
        let commentItems = [];
        let showDeleteButton = isLogin;
        /**
         * 对评论进行序列化操作
         * 对评论按日期进行倒叙
         * 对评论进行子评论组织
         */
        let newComments = formatComments(comments);
        newComments.map((comment)=>{
            commentItems.push(<CommentItem key={comment['_id']} comment={comment} blogId={blogId} commentActions={commentActions} parentName={''} showDeleteButton={showDeleteButton} authCookie={authCookie}/>);
            /*if(comment['children']) {
                comment['children'].map((childComment)=>{
                    commentItems.push(<CommentItem key={childComment['_id']} comment={childComment} blogId={blogId} commentActions={commentActions}/>)
                })
            }*/
            commentIterator(comment['children'], commentItems , commentActions, blogId, comment['name'],showDeleteButton,authCookie);
        });
        return (
            <div className="commentWrap">
                <h2 className="commentTitle">[ 评论一角 ]</h2>
                {comments.length==0?<p className="commentInitInfo">还没有评论，沙发等你来！</p>:null}
                <CommentInput blogId={blogId} saveComment={commentActions.saveComment} parentId={''}/>
                {commentItems}
            </div>
        );
    }
}