import React, {Component} from 'react';
import WangEditor from 'wangeditor';
import {browserHistory} from 'react-router';
require('./index.css');

export default class RichEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:'博客',
            author:'yvan',
            blogStatus:'draft',
            blogType:'design',
            content:'Tell a story...'
        };
        this.saveBlog = (id, contentState, plaintext)=>this._saveBlog(id, contentState, plaintext);
        this.setTitle = (event)=>this._setTitle(event);
        this.setAuthor = (event)=>this._setAuthor(event);
        this.setBlogStatus = (event)=> this._setBlogStatus(event);
        this.setBlogType = (event)=> this._setBlogType(event);
        this.getContent = ()=>this._getContent();
    }

    _saveBlog(id){
        const {saveBlog} = this.props;
        var rowData = this.editor.$txt.html();
        var plaintext = this.editor.$txt.formatText();
        if(plaintext.length>300){
            plaintext = plaintext.substring(0, 300);
        }
        let blogData = {
            id:id,
            author:this.state.author,
            title: this.state.title,
            blogStatus: this.state.blogStatus,
            type:this.state.blogType,
            rowData:rowData,
            plaintext: plaintext
        };
        saveBlog(blogData, ()=>{
            console.log('跳转首页');
            browserHistory.push('/');
        });
    }

    _setTitle(event){
        this.setState({
            title:event.target.value
        });
    }

    _setAuthor(event){
        this.setState({
            author:event.target.value
        });
    }

    _setBlogStatus(event){
        this.setState({
            blogStatus:event.target.value
        });
    }

    _setBlogType(event){
        this.setState({
            blogType:event.target.value
        });
    }
    // 获取内容
    _getContent() {
        var content = this.editor.$txt.html();
        console.log(content);
    }

    componentWillMount(){
        let {editData} = this.props;
        if(editData){
            this.setState({
                title:editData['title'],
                blogStatus:editData['blogStatus'],
                content:editData['content']
            });
        }
    }

    componentDidMount () {
        var id = this.props.id;
        this.editor = new WangEditor(id);
        // 上传图片（举例）
        this.editor.config.uploadImgUrl = '/upload';

        // 配置自定义参数（举例）
        this.editor.config.uploadParams = {
            token: 'blogeec',
            user: 'wangyafei'
        };

        // 设置 headers（举例）
        this.editor.config.uploadHeaders = {
            'Accept' : 'text/x-json'
        };

        this.editor.create();

        // 初始化内容
        this.editor.$txt.html(this.state.content);
    }

    render() {
        const {editData} = this.props;
        let id='11';
        if(editData){
            id=editData['_id'];
        }
        return (
            <div className="contentEditor" >
                <form className="blogInfo">
                    <div className="title">
                        <label htmlFor="title">标题：</label>
                        <input type="text" value={this.state.title} onChange={this.setTitle}/>
                    </div>
                    <div className="author">
                        <label htmlFor="title">作者：</label>
                        <input type="text" value={this.state.author} onChange={this.setAuthor}/>
                    </div>
                    <div className="blogType">
                        <lable htmlFor="blogType">类别：</lable>
                        <select value={this.state.blogType} onChange={this.setBlogType}>
                            <option value="design">设计</option>
                            <option value="develop">前端</option>
                        </select>
                    </div>
                    <div className="blogStatus">
                        <lable htmlFor="blogStatus">状态：</lable>
                        <select value={this.state.blogStatus} onChange={this.setBlogStatus}>
                            <option value="draft">草稿</option>
                            <option value="publish">发布</option>
                        </select>
                    </div>
                </form>
                <div id={this.props.id} contentEditable="true"></div>
                <div className="bottomBar">
                    <span className="saveButton" onClick={()=>this.saveBlog(id)}>保存</span>
                </div>
            </div>
        );
    }
}