import React, {Component} from 'react';
import CommentInput from '../CommentInput/CommentInput';
import CommentItem from '../CommentItem/CommentItem';
import {formatComments} from '../../utils/util';
require('./index.css');

function commentIterator(childComments, commentItems, commentActions, blogId, parentName){
    if(childComments) {
        childComments.map((childComment)=>{
            commentItems.push(<CommentItem key={childComment['_id']} comment={childComment} blogId={blogId} commentActions={commentActions} parentName={parentName}/>)
            if(childComment['children']){
                commentIterator(childComment['children'], commentItems, commentActions, blogId, childComment['name']);
            }
        });
    }
}

export default class Comment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {comments , commentActions, blogId} = this.props;
        let commentItems = [];
        /**
         * 对评论进行序列化操作
         * 对评论按日期进行倒叙
         * 对评论进行子评论组织
         */
        let newComments = formatComments(comments);
        newComments.map((comment)=>{
            commentItems.push(<CommentItem key={comment['_id']} comment={comment} blogId={blogId} commentActions={commentActions} parentName={''}/>);
            /*if(comment['children']) {
                comment['children'].map((childComment)=>{
                    commentItems.push(<CommentItem key={childComment['_id']} comment={childComment} blogId={blogId} commentActions={commentActions}/>)
                })
            }*/
            commentIterator(comment['children'], commentItems , commentActions, blogId, comment['name']);
        });
        return (
            <div className="commentWrap">
                <h2 className="commentTitle">[ 评论一角 ]</h2>
                <CommentInput blogId={blogId} saveComment={commentActions.saveComment} parentId={''}/>
                {commentItems}
            </div>
        );
    }
}