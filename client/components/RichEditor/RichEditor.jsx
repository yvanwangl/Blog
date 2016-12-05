import React, {Component} from 'react';
import WangEditor from 'wangeditor';
import {browserHistory} from 'react-router';
require('./index.css');

export default class RichEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            author:'',
            blogStatus:'draft',
            blogType:'design',
            content:'开始书写你的故事...'
        };
        this.saveBlog = (id, blogStatus)=>this._saveBlog(id, blogStatus);
        this.setTitle = (event)=>this._setTitle(event);
        this.setAuthor = (event)=>this._setAuthor(event);
        this.setBlogStatus = (event)=> this._setBlogStatus(event);
        this.setBlogType = (event)=> this._setBlogType(event);
        this.getContent = ()=>this._getContent();
    }

    _saveBlog(id, blogStatus){
        const {saveBlog} = this.props;
        var title = this.state.title || '博客';
        var author = this.state.author || '王亚飞';
        var rowData = this.editor.$txt.html();
        var plaintext = this.editor.$txt.formatText();
        if(plaintext.length>300){
            plaintext = plaintext.substring(0, 300);
        }
        let blogData = {
            id:id,
            author: author,
            title: title,
            blogStatus: blogStatus,
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
                author:editData['author'],
                blogType:editData['type'],
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

        $("#editor1").niceScroll({
            cursorcolor:"#8a8a8a",
            cursoropacitymax:1,
            touchbehavior:false,
            cursorwidth:"5px",
            cursorborder:"0",
            cursorborderradius:"5px",
            horizrailenabled:false,
            mousescrollstep:40
        });

        /*let $ = window.jQuery;
        var $wangEditor = $('.wangEditor-container');
        var editorTop = $wangEditor.offset().top;
        var beforeScrollTop = $(window).scrollTop();
        $(window).on("scroll", function() {
            var afterScrollTop = $(window).scrollTop(),
                delta = afterScrollTop - beforeScrollTop;
            if( delta === 0 ) return false;
            if( delta > 0){
                if(afterScrollTop>= editorTop){
                    $wangEditor.addClass('toolFixed');
                }
                console.log('down');
            }/!*else {
                if(afterScrollTop+20< editorTop){
                    $wangEditor.removeClass('toolFixed');
                }
                console.log('up');
            }*!/
            beforeScrollTop = afterScrollTop;
        });*/

        /*let $ = window.jQuery;
        let $wangEditor = $('.wangEditor-container');
        let editorTop = $wangEditor.offset().top;
        let beforeScrollTop = document.body.scrollTop;
        let winBeforeScrollTop = $(window).scrollTop();
        $(window).on('scroll',function(){
            let afterScrollTop = document.body.scrollTop;
            let delta = afterScrollTop-beforeScrollTop;
            console.log(beforeScrollTop);
            console.log(winBeforeScrollTop);
            if( delta === 0 ) return false;
            //向上滚动
            if(delta>0&&afterScrollTop>editorTop){
                $wangEditor.addClass('toolFixed');
            }else {
                if($wangEditor.hasClass('toolFixed')){
                    $wangEditor.removeClass('toolFixed');
                }
            }
        });*/
        /*scroll(function(direction) { console.log(direction) });
        function scroll( fn ) {
            var beforeScrollTop = document.body.scrollTop,
                fn = fn || function() {};
            window.addEventListener("scroll", function() {
                var afterScrollTop = document.body.scrollTop,
                    delta = afterScrollTop - beforeScrollTop;
                if( delta === 0 ) return false;
                fn( delta > 0 ? "down" : "up" );
                beforeScrollTop = afterScrollTop;
            }, false);
        }*/
    }

    render() {
        const {editData} = this.props;
        let id='11';
        if(editData){
            id=editData['_id'];
        }
        return (
            <div className="richEditor" >
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
                        <select value={this.state.blogType} placeholder={this.state.blogType} onChange={this.setBlogType}>
                            <option value="design">设计</option>
                            <option value="develop">前端</option>
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