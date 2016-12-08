import React, {Component} from 'react';
import Draft,
{
    Editor,
    EditorState,
    Entity,
    RichUtils,
    ContentState,
    CompositeDecorator,
    AtomicBlockUtils
} from 'draft-js';
/*import Editor from 'draft-js-plugins-editor';*/
import EditorToolBar from '../EditorComponents/EditorToolBar/EditorToolBar';
import {browserHistory} from 'react-router';
import ImageComponent from '../ImageComponent/ImageComponent';
require('./index.css');
require('./Draft.css');
/*import createRichButtonsPlugin from 'draft-js-richbuttons-plugin';
 const richButtonsPlugin = createRichButtonsPlugin();*/

function getBlockStyle(contentBlock) {
    const blockType = contentBlock.getType();
    if (blockType === 'blockquote') {
        return 'superFancyBlockquote';
    }
}

const styleMap = {
    'CODE': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
    }
};

export default class ContentEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '博客',
            author: 'yvan',
            editorState: EditorState.createEmpty(),
            blogStatus: 'draft'
        };
        this.onChange = (editorState) => this.setState({editorState});
        this.handleKeyCommand = (command)=>this._handleKeyCommand(command);
        this.changeFontStyle = ()=>this._changeFontStyle();
        this.toggleBlockType = (type)=>this._toggleBlockType(type);
        this.toggleInlineStyle = (style)=>this._toggleInlineStyle(style);
        this.focus = ()=>this.refs.editor.focus();
        this.saveBlog = (id, contentState, plaintext)=>this._saveBlog(id, contentState, plaintext);
        this.setTitle = (event)=>this._setTitle(event);
        this.setAuthor = (event)=>this._setAuthor(event);
        this.setBlogStatus = (event)=> this._setBlogStatus(event);
        this.handleUploadImage = (event)=> this._handleUploadImage(event);
        this.handleFileInput = (event)=> this._handleFileInput(event);
        this.insertImage = (file)=> this._insertImage(file);
        this.blockRenderer = (block) => {
            if (block.getType() === 'atomic') {
                return {
                    component: ImageComponent
                };
            }
            return null;
        }
    }


    _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    _changeFontStyle() {
        console.log('font');
    }

    _toggleBlockType(blockType) {
        const {editorState} = this.state;
        this.onChange(RichUtils.toggleBlockType(editorState, blockType));
    }

    _toggleInlineStyle(inlineStyle) {
        const {editorState} = this.state;
        this.onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    }

    _saveBlog(id, rowData, plaintext) {
        const {saveBlog} = this.props;
        let blogData = {
            id: id,
            author: this.state.author,
            title: this.state.title,
            blogStatus: this.state.blogStatus,
            rowData: rowData,
            plaintext: plaintext
        };
        saveBlog(blogData, ()=> {
            console.log('跳转首页');
            browserHistory.push('/');
        });
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

    _handleUploadImage(event) {
        this.refs.fileInput.click();
    }

    _handleFileInput(event) {
        const fileList = event.target.files;
        const file = fileList[0];
        this.insertImage(file);
    }

    _insertImage(file) {
        const entityKey = Entity.create('atomic', 'IMMUTABLE', {src: URL.createObjectURL(file)});
        this.onChange(AtomicBlockUtils.insertAtomicBlock(
            this.state.editorState,
            entityKey,
            ' '
        ));
    }

    componentWillMount() {
        let {editData} = this.props;
        if (editData) {
            this.setState({
                title: editData['title'],
                editorState: EditorState.createWithContent(Draft.convertFromRaw(editData['content'])),
                blogStatus: editData['blogStatus']
            });
        }
    }

    render() {
        const {editorState} = this.state;
        const {editData} = this.props;
        let id = '11';
        const onToggle = {
            changeFontStyle: this.changeFontStyle,
            toggleBlockType: this.toggleBlockType,
            toggleInlineStyle: this.toggleInlineStyle,
            handleUploadImage: this.handleUploadImage
        };
        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        var rowData = Draft.convertToRaw(contentState);
        var plaintext = contentState.getPlainText();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className = `${className}+' RichEditor-hidePlaceholder'`;
            }
        }
        if (editData) {
            id = editData['_id'];
        }


        return (
            <div className="contentEditor RichEditor-root">
                <EditorToolBar editorState={editorState} {...onToggle}/>
                <form className="blogInfo">
                    <div className="title">
                        <label htmlFor="title">标题：</label>
                        <input type="text" value={this.state.title} onChange={this.setTitle}/>
                    </div>
                    <div className="author">
                        <label htmlFor="title">作者：</label>
                        <input type="text" value={this.state.author} onChange={this.setAuthor}/>
                    </div>
                    <div className="blogStatus">
                        <lable htmlFor="blogStatus">状态：</lable>
                        <select value={this.state.blogStatus} onChange={this.setBlogStatus}>
                            <option value="draft">草稿</option>
                            <option value="publish">发布</option>
                        </select>
                    </div>
                </form>
                <div className={className} onClick={this.focus}>
                    <Editor
                        ref="editor"
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        blockRendererFn={this.blockRenderer}
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        placeholder="Tell a story..."
                        spellCheck={true}
                    />
                    <input type="file" ref="fileInput" style={{display: 'none'}}
                           onChange={this.handleFileInput}/>
                </div>
                <div className="bottomBar">
                    <span className="saveButton" onClick={()=>this.saveBlog(id, rowData, plaintext)}>保存</span>
                </div>
            </div>
        );
    }
}