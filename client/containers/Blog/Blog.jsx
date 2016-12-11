import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Blogs';
import BlogItem from '../../components/BlogItem/BlogItem';
import fetch from 'isomorphic-fetch';
import LoginDialog from '../../components/LoginDialog/LoginDialog';
require('./index.css');

class Blog extends Component {
    constructor(props) {
        super(props);
        this.pageChangeClick = (direction)=> this._pageChangeClick(direction);
    }

    fetchTest() {
        const {actions} = this.props;
        fetch('test.json', {
            method: 'GET'
        })
            .then(response=>response.json())
            .then(json=> {
                //console.log(JSON.stringify(json));
                console.log(json);
            })
            .catch(e=> {
                console.log(e);
            })
    }

    submitLoginInfo(values) {
        console.log('start send data');
        fetch('/login', {
            method: 'POST',
            mode: 'cors',
            Origin: '*',
            headers: { // headers: fetch事实标准中可以通过Header相关api进行设置
                'Content-Type': 'application/json' // default: 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(response=>response.json())
            .then(json=> {
                console.log(json);
            })
            .catch(e=> {
                console.log(JSON.stringify(e));
            });
    }

   /* componentWillMount() {
        let {actions, login, page} = this.props;
        actions.initBlogList(login.is_login,  page);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps != this.props) {
            let {actions, login, page} = nextProps;
            if (this.props.login.is_login != login.is_login) {
                actions.initBlogList(login.is_login, page);
            }
        }
    }*/

/*    fetchBlogContent(blogId) {
        let {actions} = this.props;
        actions.initBlogContent(blogId);
    }*/

    _pageChangeClick(direction){
        let {login, type, page, actions} = this.props;
        actions.initBlogList(login.is_login, type ,page+direction);
    }

    render() {
        const {blogs, actions, login, page, hasNextPage} = this.props;
        let blogItems = [];
        let showEdit = false;
        if (login.is_login) {
            showEdit = true;
        }
        blogs.map((blog, index)=>
            blogItems.push(
                <BlogItem key={index} blogData={blog} showEdit={showEdit} loadBlogData={actions.saveBlogCount}
                          editBlogData={actions.initBlogContent}/>
            )
        );

        return (
            <div className="blogsContainer container">
                <ul>
                    {blogItems}
                </ul>
                {
                    page==1&&hasNextPage?<div className="paginate"><span className="pageButton next" onClick={this.pageChangeClick.bind(this, 1)}>下一页</span></div>:
                        page!=1&&hasNextPage?<div className="paginate"><span className="pageButton prev" onClick={this.pageChangeClick.bind(this, -1)}>上一页</span><span className="pageButton next" onClick={this.pageChangeClick.bind(this, 1)}>下一页</span></div>:
                            page!=1&&!hasNextPage?<div className="paginate"><span className="pageButton prev" onClick={this.pageChangeClick.bind(this, -1)}>上一页</span></div>:null
                }
                {/*<ListSortContainer/>*/}
                {/*<LoginDialog onLogin={this.submitLoginInfo.bind(this)}/>*/}

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        blogs: state.blogs.blogs,
        login: state.login,
        type: state.blogs.type,
        page: state.blogs.page,
        hasNextPage: state.blogs.hasNextPage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);

