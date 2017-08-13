import { INIT_BLOG_LIST_SUCCESS,INIT_BLOG_LIST_FAIL, SHOW_BLOG_CONTENT, SAVE_BLOG_SUCCESS, DELETE_BLOG, SAVE_BLOG_COUNTER } from '../constants/ActionTypes';
import {initCommentListSuccess} from './Comments';
import fetch from 'isomorphic-fetch';
import request from '../utils/request';

export function fetchTest(){
	return (dispatch)=>{
        request('/test', {
            method:'POST',
            body:JSON.stringify({
                name:'wangyafei',
                content:'前台post数据'
            })
        })
		.then(json=>{
			console.log(JSON.stringify(json));
			dispatch(addBlog(json));
		});
	}
}

//查询所有博客
//return {is_success:true, blogs:blogs}
export function initBlogList(is_login=false, type='all', page=1, authCookie){
	return (dispatch)=>{
            request(`/blog-api?is_login=${is_login}&type=${type}&page=${page}&authCookie=${authCookie}`)
			.then(json=>{
				if(json.is_success){
					dispatch(initBlogListSuccess(json.blogs, json.type, json.page, json.totalBlogs));
				}else {
					dispatch(initBlogListFail())
				}
			});
	}
}

//新增博客和修改博客
//return {is_success:true, blog:blog}
export function saveBlog(blogData, callback){
    let id = blogData['id'];
    if(id=='11'){           //新增
        return (dispatch)=>{
                request('/blog-api', {
                    method:'POST',
                    body:JSON.stringify(blogData)
                })
                .then(json=>{
                    if(json.is_success){
                        dispatch(saveBlogSuccess(json.blog, 'add'));
                        callback && callback();
                    }else {
                        console.log('save fail');
                    }
                });
        }
    }else {                 //修改
        return (dispatch)=>{
                request(`/blog-api/${id}`, {
                    method:'PUT',
                    body:JSON.stringify(blogData)
                })
                .then(json=>{
                    if(json.is_success){
                        dispatch(saveBlogSuccess(json.blog, 'modify'));
                        callback && callback();
                    }else {
                        console.log('save fail');
                    }
                });
        }
    }

}

//修改时：根据id查询博客
//return {is_success:true, blog:blog}
export function initBlogContent(blogId,callback) {
    return (dispatch)=>{
            request(`/blog-api/${blogId}`)
            .then(json=>{
                if(json.is_success){
                    //console.log(JSON.stringify(json.blogContent));
                    dispatch(showBlogContent(json.blog));
                    if(callback){
                        callback();
                    }
                }
            });
    }
}

//浏览时：根据id查询博客并保存浏览量数据,
//return {is_success:true, blog:blog, comments:comments}
export function saveBlogCount(blogId, count, callback) {
    return (dispatch)=>{
            request(`/blog-api/${blogId}?count=${count}`)
            .then(json=>{
                if(json.is_success){
                    dispatch(saveBlogCounterSuccess(json.blog));
                    dispatch(initCommentListSuccess(json.comments));
                    if(callback){
                        callback();
                    }
                }else {
                    console.log('save fail');
                }
            });
    }
}

export function initBlogListSuccess(blogs, blogType, page, totalBlogs) {
    return {
        type:INIT_BLOG_LIST_SUCCESS,
        blogs,
        blogType,
        page,
        totalBlogs
    }
}

export function initBlogListFail() {
    return {
        type:INIT_BLOG_LIST_FAIL
    }
}

export function showBlogContent(blog) {
    return {
        type:SHOW_BLOG_CONTENT,
        blog
    }
}

export function saveBlogSuccess(blog, action){
	return {
		type:SAVE_BLOG_SUCCESS,
		blog,
        action
	}
}

export function deleteBlog(blog){
	return {
		type:DELETE_BLOG,
		blog
	}
}

export function saveBlogCounterSuccess(blog) {
    return {
        type:SAVE_BLOG_COUNTER,
        blog
    };
}
