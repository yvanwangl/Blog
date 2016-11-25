import { ADD_BLOG } from '../constants/ActionTypes';

var currentHost = window.location.href;
var sunnyhuanPage = 'https://sunnyhuan.yvanwang.com/';   //'http://localhost:3000/'
const initState = currentHost==sunnyhuanPage
    ?{
        resumeTitle: `Li Huan`,
        personalInfo: `我是一名交互设计师，爱好旅游和写作。`,
        currentState: '北京科技大学，设计艺术学硕士',
        page: 'huan'
    }:{
        resumeTitle: `Yvan wang`,
        personalInfo: `我是一名前端开发攻城狮，学设计出身，最后发现还是更喜欢写代码。喜欢新技术，喜欢分享，这里是我的`,
        currentState: '四达时代集团，前端开发工程师',
        page: 'fei'
    };

export default function resume (state = initState, action){
	switch(action.type){
		case ADD_BLOG:
			return state;
		default:
			return state;
	}
}