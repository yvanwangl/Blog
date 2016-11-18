import React, {Component} from 'react';
import BlockStyleControls from '../BlockStyleControls/BlockStyleControls';
import InlineStyleControls from '../InlineStyleControls/InlineStyleControls';
import MediaControls from '../MediaControls/MediaControls';
require('./index.css');

export default class EditorToolBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            editorState,
            changeFontStyle,
            toggleBlockType,
            toggleInlineStyle,
            handleUploadImage
        } = this.props;
        return (
            <div className="editorToolBar">
                {/*<FontStyleControls editorState={editorState} onChange={changeFontStyle}/>*/}
                <BlockStyleControls editorState={editorState} onToggle={toggleBlockType}/>
                <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle}/>
                <MediaControls editorState={editorState} onUploadImage={handleUploadImage}/>
            </div>
        );
    }
}