import React, {Component} from 'react';
import WangEditor from 'wangeditor';
import {browserHistory} from 'react-router';
require('./index.css');

export default class RichEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            blogStatus: 'draft',
            blogType: 'design',
            content: '开始书写你的故事...',
            updateDate: 'true',
            timeOutTimer: null,
            intervalTimer: null
        };
        this.saveBlog = (id, blogStatus, callback)=>this._saveBlog(id, blogStatus, callback);
        this.setTitle = (event)=>this._setTitle(event);
        this.setAuthor = (event)=>this._setAuthor(event);
        this.setBlogStatus = (event)=> this._setBlogStatus(event);
        this.setBlogType = (event)=> this._setBlogType(event);
        this.setUpdateDate = (event)=> this._setUpdateDate(event);
        this.getContent = ()=>this._getContent();
    }

    _saveBlog(id, blogStatus, callback) {
        const {saveBlog, authCookie} = this.props;
        var title = this.state.title || '博客';
        var author = this.state.author || '王亚飞';
        var rowData = this.editor.$txt.html();
        var updateDate = this.state.updateDate;
        var plaintext = this.editor.$txt.formatText();
        if (plaintext.length > 300) {
            plaintext = plaintext.substring(0, 300);
        }
        let blogData = {
            id: id,
            author: author,
            title: title,
            blogStatus: blogStatus,
            type: this.state.blogType,
            rowData: rowData,
            plaintext: plaintext,
            updateDate: updateDate,
            authCookie: authCookie
        };
        let callbackFn = callback ? callback:()=> {
                console.log('保存成功！');
            };
        saveBlog(blogData , callbackFn);
    }

    _setTitle(event) {
        this.setState({
            title: event.target.value
        });
    }

    _setAuthor(event) {
        this.setState({
            author: event.target.value
        });
    }

    _setBlogStatus(event) {
        this.setState({
            blogStatus: event.target.value
        });
    }

    _setBlogType(event) {
        this.setState({
            blogType: event.target.value
        });
    }

    _setUpdateDate(event) {
        console.log(typeof event.target.value);
        this.setState({
            updateDate: event.target.value
        });
    }

    // 获取内容
    _getContent() {
        var content = this.editor.$txt.html();
        console.log(content);
    }

    componentWillMount() {
        let {editData} = this.props;
        if (editData) {
            this.setState({
                title: editData['title'],
                author: editData['author'],
                blogType: editData['type'],
                blogStatus: editData['blogStatus'],
                content: editData['content'],
                updateDate: 'false'
            });
        }
    }

    componentDidMount() {
        var id = this.props.id;
        let me = this;
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
            'Accept': 'text/x-json'
        };

        this.editor.config.menus = [
            'source',
            '|',
            'bold',
            'underline',
            'italic',
            'strikethrough',
            'eraser',
            'forecolor',
            'bgcolor',
            '|',
            'quote',
            'fontfamily',
            'fontsize',
            'head',
            'unorderlist',
            'orderlist',
            'alignleft',
            'aligncenter',
            'alignright',
            '|',
            'link',
            'unlink',
            'table',
            'emotion',
            '|',
            'img',
            'video',
            //'location',
            'insertcode',
            '|',
            'undo',
            'redo',
            /*'fullscreen'*/
        ];
        /*this.editor.config.menuFixed = 5;*/

        this.editor.create();

        // 初始化内容
        this.editor.$txt.html(this.state.content);

        /*const {editData} = this.props;
        let dataId = '11';
        if (editData) {
            dataId = editData['_id'];
        }
        let timeOutTimer = setTimeout(()=>{
            me.saveBlog(dataId, 'draft', ()=> {console.log('Auto Save Success!')})
        }, 5000);

        this.setState({
            timeOutTimer: timeOutTimer
        });*/
    }

    /*componentWillReceiveProps(nextProps) {
        const {editData} = nextProps;
        const {intervalTimer} = this.state;
        let me = this;
        let dataId = '11';
        if (editData) {
            dataId = editData['_id'];
        }
        if(!intervalTimer){
            let intervalTimer = setInterval(()=>{
                me.saveBlog(dataId, 'draft', ()=> {console.log('Auto Save Success!')})
            }, 5000);

            this.setState({
                intervalTimer: intervalTimer
            });
        }

    }*/

    /*componentWillUnmount(){
        const {timeOutTimer, intervalTimer} = this.state;
        if(timeOutTimer){
            clearTimeout(timeOutTimer);
        }
        if(intervalTimer){
            clearInterval(intervalTimer);
        }
    }*/

    render() {
        const {editData} = this.props;
        let id = '11';
        if (editData) {
            id = editData['_id'];
        }
        return (
            <div className="richEditor">
                <form className="blogInfo">
                    <div className="title">
                        <label htmlFor="title">标题：</label>
                        <input type="text" value={this.state.title} placeholder='Title' onChange={this.setTitle}/>
                    </div>
                    <div className="author">
                        <label htmlFor="title">作者：</label>
                        <input type="text" value={this.state.author} placeholder='Author' onChange={this.setAuthor}/>
                    </div>
                    <div className="blogType">
                        <label htmlFor="blogType">类别：</label>
                        <select value={this.state.blogType} placeholder={this.state.blogType}
                                onChange={this.setBlogType}>
                            <option value="design">设计</option>
                            <option value="develop">前端</option>
                        </select>
                    </div>
                    <div className="updateDate">
                        <label htmlFor="updateDate">更新日期：</label>
                        <select value={this.state.updateDate} placeholder={this.state.updateDate}
                                onChange={this.setUpdateDate}>
                            <option value="true">更新</option>
                            <option value="false">不更新</option>
                        </select>
                    </div>
                    {/*<div className="blogStatus">
                     <label htmlFor="blogStatus">状态：</label>
                     <select value={this.state.blogStatus} placeholder={this.state.blogStatus} onChange={this.setBlogStatus}>
                     <option value="draft">草稿</option>
                     <option value="publish">发布</option>
                     </select>
                     </div>*/}
                </form>
                <div id={this.props.id} contentEditable="true"></div>
                <div className="bottomBar">
                    <span className="saveButton" onClick={()=>this.saveBlog(id, 'draft')}>草稿</span>
                    <span className="saveButton" onClick={()=>this.saveBlog(id, 'publish')}>发布</span>
                </div>
            </div>
        );
    }
}