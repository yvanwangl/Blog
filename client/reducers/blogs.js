import { INIT_BLOG_LIST_SUCCESS, INIT_BLOG_LIST_FAIL, SHOW_BLOG_CONTENT, SAVE_BLOG_SUCCESS, DELETE_BLOG, SAVE_BLOG_COUNTER, PAGINATE } from '../constants/ActionTypes';
import { FILTER_BLOG } from '../constants/NavActions';

const initState = {
	blogs:[
		{
			id:1,
			title:'Workflow 实现签到应用客户端',
			author:'王亚飞',
			content:'Workflow 是 iOS 平台里一个扩展性极强的自动流程 app，可以自定义一系列复杂操作并把它们编排成脚本，之后便可一键快速执行。网上虽然流传着不少 Workflow 脚本，但大多都仅用于简化日常操作或者实现一些扩展功能而已，经过一段时间的体验，我发现它的潜力远远不止于此：只要有些编程基础，完全可以把它当作一个简单的可视化脚本编程工具来用。',
			publishDate:'2016-09-16'
		},
		{
			id:2,
			title:'Workflow 实现签到应用客户端',
			author:'王亚飞',
			content:'Workflow 是 iOS 平台里一个扩展性极强的自动流程 app，可以自定义一系列复杂操作并把它们编排成脚本，之后便可一键快速执行。网上虽然流传着不少 Workflow 脚本，但大多都仅用于简化日常操作或者实现一些扩展功能而已，经过一段时间的体验，我发现它的潜力远远不止于此：只要有些编程基础，完全可以把它当作一个简单的可视化脚本编程工具来用。',
			publishDate:'2016-09-16'
		},
		{
			id:3,
			title:'Workflow 实现签到应用客户端',
			author:'王亚飞',
			content:'Workflow 是 iOS 平台里一个扩展性极强的自动流程 app，可以自定义一系列复杂操作并把它们编排成脚本，之后便可一键快速执行。网上虽然流传着不少 Workflow 脚本，但大多都仅用于简化日常操作或者实现一些扩展功能而已，经过一段时间的体验，我发现它的潜力远远不止于此：只要有些编程基础，完全可以把它当作一个简单的可视化脚本编程工具来用。',
			publishDate:'2016-09-16'
		},
		{
			id:4,
			title:'Workflow 实现签到应用客户端',
			author:'王亚飞',
			content:'Workflow 是 iOS 平台里一个扩展性极强的自动流程 app，可以自定义一系列复杂操作并把它们编排成脚本，之后便可一键快速执行。网上虽然流传着不少 Workflow 脚本，但大多都仅用于简化日常操作或者实现一些扩展功能而已，经过一段时间的体验，我发现它的潜力远远不止于此：只要有些编程基础，完全可以把它当作一个简单的可视化脚本编程工具来用。',
			publishDate:'2016-09-16'
		}
	]
};

function initBlogListSuccess(state, blogs, type, page, totalBlogs) {
/*	blogs = blogs.sort(function(blogA, blogB){
		return new Date(blogB['publishDate']).getTime()-new Date(blogA['publishDate']).getTime();
	});*/
	let hasNextPage = state['hasNextPage'];
	if(totalBlogs>page*10){
		hasNextPage = true;
	}else {
		hasNextPage = false;
	}
	return Object.assign({},state,{blogs:blogs, type:type, page:parseInt(page), hasNextPage:hasNextPage});
}

function initBlogListFail() {
	return Object.assign({},state,{errorMsg:'init fail'});
}

function showBlogContent(state, blog) {
	//console.log(JSON.stringify(blog));
	var blogData = Object.assign({},blog,{content:JSON.parse(blog['content'])});
    return Object.assign({},state,{blog:blogData});
}

function saveBlogSuccess(state, blog, action){
	let blogs = state['blogs'];
    if(action=='add'){
        blogs = [ blog, ...blogs];
    }else {
        blogs = blogs.map(blogData=>
            blogData['_id']==blog['_id']?
            {...blogData,...blog}
            :blogData
        );
    }
	return Object.assign({}, state, {blogs: blogs});
}

function deleteBlog(state, blog){
	let blogs = state['blogs'];
	blogs = blogs.filter(blogItem=>blogItem['id']!=blog['id']);
	return Object.assign({}, state, {blogs: blogs});
}

let comments = [
    {
        name:'wangyafei',
        commentTime:'2015年5月6日',
        commentContent:'这个评论系统是自己设计的嘛！！'
    },
    {
        name:'lihuan',
        commentTime:'2015年5月6日',
        commentContent:'这个好棒啊！！'
    },
    {
        name:'huanhuan',
        commentTime:'2015年5月6日',
        commentContent:'这个评论的嘛！！'
    }
];

function saveBlogCount(state, blog) {
    var blogData = Object.assign({},blog,{content:JSON.parse(blog['content'])});
	return Object.assign({},state,{blog:blogData});
}


const filterFuns = {
    all:()=>true,
    design:(blog)=>blog['type']=='design',
    develop:(blog)=>blog['type']=='develop'
};

function filterBlogs(state, blogType) {
    let originBlogs = state.originBlogs || state.blogs;
    let newBlogs = originBlogs.filter(filterFuns[blogType]);
    return Object.assign({}, state, {blogs: newBlogs, originBlogs: originBlogs});
}

function paginate(state, direction) {
    let page = state['page'];
    if(direction>0){
        page+=1;
    }else {
        page-=1;
    }
    return Object.assign({}, state, {page: page});
}

export default function blogs(state={blogs:[],blog:{},type:'all',page:1,hasNextPage:false}, action){
	switch(action.type){
		case INIT_BLOG_LIST_SUCCESS:
			return initBlogListSuccess(state, action['blogs'], action['blogType'], action['page'], action['totalBlogs']);
		case INIT_BLOG_LIST_FAIL:
			return initBlogListFail(state);
        case SHOW_BLOG_CONTENT:
            return showBlogContent(state, action['blog']);
		case SAVE_BLOG_SUCCESS:
			return saveBlogSuccess(state, action['blog'], action['action']);
		case DELETE_BLOG:
			return deleteBlog(state, action['blog']);
		case SAVE_BLOG_COUNTER:
			return saveBlogCount(state, action['blog']);
        case FILTER_BLOG:
            return filterBlogs(state, action['blogType']);
		default:
			return state;
	}
}
