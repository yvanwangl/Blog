import { INIT_BLOG_LIST_SUCCESS,INIT_BLOG_LIST_FAIL, SHOW_BLOG_CONTENT, SAVE_BLOG_SUCCESS, DELETE_BLOG, SAVE_BLOG_COUNTER } from '../constants/ActionTypes';
import {initCommentListSuccess} from './Comments';
import fetch from 'isomorphic-fetch';

export function fetchTest(){
	return (dispatch)=>{
		fetch('/test',{
			method:'POST',
			mode: 'cors',
            Origin: '*',
            headers: { // headers: fetch事实标准中可以通过Header相关api进行设置
		        'Content-Type': 'application/json' // default: 'application/json'
		    },
			body:JSON.stringify({
				name:'wangyafei',
				content:'前台post数据'
			})
		})
		.then(response=>response.json())
		.then(json=>{
			console.log(JSON.stringify(json));
			dispatch(addBlog(json));
		})
		.catch(e=>{
			console.log(e);
		})
	}
}

//查询所有博客
//return {is_success:true, blogs:blogs}
export function initBlogList(is_login=false, type='all', page=1, authCookie){
	return (dispatch)=>{
		fetch(`/blog?is_login=${is_login}&type=${type}&page=${page}&authCookie=${authCookie}`,{
			method:'GET',
			mode:'cors',
			Origin:'*',
            headers: { // headers: fetch事实标准中可以通过Header相关api进行设置
                'Content-Type': 'application/json' // default: 'application/json'
            }
		})
			.then(response=>response.json())
			.then(json=>{
				if(json.is_success){
					dispatch(initBlogListSuccess(json.blogs, json.type, json.page, json.totalBlogs));
				}else {
					dispatch(initBlogListFail())
				}
			})
			.catch(e=>console.log(e));
	}
}

//新增博客和修改博客
//return {is_success:true, blog:blog}
export function saveBlog(blogData, callback){
    let id = blogData['id'];
    if(id=='11'){           //新增
        return (dispatch)=>{
            fetch('/blog',{
                method:'POST',
                mode:'cors',
                Origin:'*',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(blogData)
            })
                .then(response=>response.json())
                .then(json=>{
                    if(json.is_success){
                        dispatch(saveBlogSuccess(json.blog, 'add'));
                        callback();
                    }else {
                        console.log('save fail');
                    }
                })
                .catch(e=>console.log(e));
        }
    }else {                 //修改
        return (dispatch)=>{
            fetch(`/blog/${id}`,{
                method:'PUT',
                mode:'cors',
                Origin:'*',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(blogData)
            })
                .then(response=>response.json())
                .then(json=>{
                    if(json.is_success){
                        dispatch(saveBlogSuccess(json.blog, 'modify'));
                        callback();
                    }else {
                        console.log('save fail');
                    }
                })
                .catch(e=>console.log(e));
        }
    }

}

//修改时：根据id查询博客
//return {is_success:true, blog:blog}
export function initBlogContent(blogId,callback) {
    return (dispatch)=>{
        fetch(`/blog/${blogId}`,{
            method:'GET',
            mode: 'cors',
            Origin: '*',
            headers: { // headers: fetch事实标准中可以通过Header相关api进行设置
                'Content-Type': 'application/json' // default: 'application/json'
            }
        })
            .then(response=>response.json())
            .then(json=>{
                if(json.is_success){
                    //console.log(JSON.stringify(json.blogContent));
                    dispatch(showBlogContent(json.blog));
                    if(callback){
                        callback();
                    }
                }
            })
            .catch(e=>{
                console.log(e);
            })
    }
}

//浏览时：根据id查询博客并保存浏览量数据,
//return {is_success:true, blog:blog, comments:comments}
export function saveBlogCount(blogId, count, callback) {
    return (dispatch)=>{
        fetch(`/blog/${blogId}?count=${count}`,{
            method:'GET',
            mode:'cors',
            Origin:'*',
            headers:{
                'Content-Type':'application/json'
            }
        })
            .then(response=>response.json())
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
            })
            .catch(e=>console.log(e));
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
