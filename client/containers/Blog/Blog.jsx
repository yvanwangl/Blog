import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/Blogs';
import BlogItem from '../../components/BlogItem/BlogItem';
require('./index.css');

class Blog extends Component {
    constructor(props) {
        super(props);
        this.pageChangeClick = (direction)=> this._pageChangeClick(direction);
    }

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

