import { INIT_COMMENT_LIST_SUCCESS, ADD_COMMENT, DELETE_COMMENT, LIKE_RESULT} from '../constants/CommentActions';
import request from '../utils/request';

export function saveComment(comment,callback){
    return (dispatch)=>{
        request('/comment', {
            method:'POST',
            body:JSON.stringify(comment)
        })
            .then(json=>{
                if(json.is_success){
                    dispatch(addCommentSuccess(json.comment));
                    if(callback){
                        callback();
                    }
                }else {
                    console.log('save fail');
                }
            });
    }
}

export function deleteComment(commentId, authCookie) {
    return (dispatch)=>{
            request(`/comment/${commentId}`,{
                method:'DELETE',
                body:JSON.stringify({
                    commentId:commentId,
                    authCookie:authCookie
                })
            })
            .then(json=>{
                if(json.is_success){
                    dispatch(deleteCommentSuccess(json.commentIds));
                }else {
                    console.log('save fail');
                }
            });
    }
}

export function likeComment(commentAction) {
    return (dispatch)=>{
            request(`/comment/${commentAction['commentId']}`, {
                method:'POST',
                body:JSON.stringify(commentAction)
            })
            .then(json=>{
                if(json.is_success){
                    dispatch(likeCommentSuccess(json.likeResult));
                }else {
                    console.log('save fail');
                }
            });
    }
}

export function initCommentListSuccess(comments) {
    return {
        type:INIT_COMMENT_LIST_SUCCESS,
        comments
    }
}

export function addCommentSuccess(comment) {
    return {
        type:ADD_COMMENT,
        comment
    }
}

export function deleteCommentSuccess(commentIds){
	return {
		type:DELETE_COMMENT,
        commentIds
	}
}

export function likeCommentSuccess(likeResult) {
    return {
        type:LIKE_RESULT,
        likeResult
    }
}

