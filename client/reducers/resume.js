import { SHOW_RESUME, HIDE_RESUME } from '../constants/ResumeActions';

var currentHost = window.location.href;
var sunnyhuanPage = 'https://sunnyhuan.yvanwang.com/';   //'http://localhost:3000/'
const initState = currentHost==sunnyhuanPage
    ?{
        resumeTitle: `Li Huan`,
        personalInfo: `我是一名交互设计师，爱好旅游和写作。`,
        currentState: '北京科技大学，设计艺术学硕士',
        skills:[
            {
                name:'Interactive Design'
            },
            {
                name:'UI Design'
            },
            {
                name:'HTML+CSS'
            }
        ],
        links:[
            {
                name:'weiChat',
                target:''
            },
            {
                name:'weiBo',
                target:'http://weibo.com/u/5406991206?sudaref=sunnyhuan.lofter.com&retcode=6102&is_hot=1'
            },
            {
                name:'UiChina',
                target:'http://i.ui.cn/ucenter/178007.html'
            },
            {
                name:'lofter',
                target:'http://sunnyhuan.lofter.com/'
            },
            {
                name:'email',
                target:'https://github.com/yvanwangl'
            }
        ],
        page: 'huan',
        showResume:false
    }:{
        resumeTitle: `Yvan wang`,
        personalInfo: `我是一名前端开发攻城狮，学设计出身，最后发现还是更喜欢写代码。喜欢新技术，喜欢分享，这里是我的`,
        currentState: '四达时代集团，前端开发工程师',
        skills:[
            {
                name:'HTML+CSS'
            },
            {
                name:'JavaScript'
            },
            {
                name:'Node.js'
            }
        ],
        links:[
            {
                name:'weiChat',
                target:''
            },
            {
                name:'weiBo',
                target:'http://weibo.com/u/3224160905?is_all=1'
            },
            {
                name:'QQ',
                target:''
            },
            {
                name:'gitHub',
                target:'https://github.com/yvanwangl'
            },
            {
                name:'email',
                target:'https://github.com/yvanwangl'
            }
        ],
        page: 'fei',
        showResume:false
    };

function showResume(state) {
    return Object.assign({},state, {showResume:true});
}

function hideResume(state) {
    return Object.assign({},state, {showResume:false});
}

export default function resume (state = initState, action){
	switch(action.type){
		case SHOW_RESUME:
			return showResume(state);
        case HIDE_RESUME:
            return hideResume(state);
		default:
			return state;
	}
}