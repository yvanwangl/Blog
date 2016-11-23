import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import * as Actions from '../../actions/Blogs';
import WangEditor from 'wangeditor';
import * as commentActions from '../../actions/Comments';
import Comment from '../../components/Comment/Comment';
import {isEmptyObject} from '../../utils/util';
require('./index.css');

class BlogContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content:''
        };
    }

    componentWillMount() {
        let {actions, blogs} = this.props;
        if(blogs.length>0){
            let targetBlog = blogs.filter((blog)=>blog['id']==this.props.params.id);
            /*actions.initBlogContent(targetBlog[0]['_id']);*/
            actions.saveBlogCount(targetBlog[0]['_id'], targetBlog[0]['count']+1);
            //console.log(JSON.stringify(blogContent));
        }else {
            browserHistory.push('/');
        }

        //this.setState({editorState: EditorState.createWithContent(ContentState.createFromBlockArray([blogContent]))});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                content: nextProps.blogContent['content']
            },()=>{
                this.editor.$txt.html(this.state.content);
            });
        }
    }

    componentDidMount () {
        var id = this.props.id;
        this.editor = new WangEditor(id);
        this.editor.config.menus = [];
        this.editor.create();
        this.editor.disable();

        // 初始化内容
        this.editor.$txt.html(this.state.content);
    }

    render() {
        let {blogContent, comments, commentActions, login} = this.props;
        if(!isEmptyObject(blogContent)){
            return (
                <div className="blogContentWrap container">
                    <h1 className="blogTitle">{blogContent['title']}</h1>
                    <p className="authorInfo">
                        作者：{blogContent['author']}
                        <span className="spliter"></span>
                        浏览量：{blogContent['count']}
                    </p>
                    <div id={this.props.id} contentEditable="false"></div>
                    <div className="comment">
                        <Comment comments={comments} blogId={blogContent['_id']} commentActions={commentActions} isLogin={login.is_login}/>
                    </div>
                </div>
            );
        }else {
            return null;
        }

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