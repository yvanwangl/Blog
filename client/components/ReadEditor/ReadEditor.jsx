import React, {Component} from 'react';
import WangEditor from 'wangeditor';

export default class ReadEditor extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount () {
        var id = this.props.id;
        this.editor = new WangEditor(id);
        this.editor.config.menus = [];
        this.editor.create();
        this.editor.disable();
        // 初始化内容
        this.editor.$txt.html(this.props.content);
    }

    componentWillReceiveProps(nextProps){
        this.editor.$txt.html(nextProps.content);
    }

    render() {
        return (
            <div id={this.props.id} contentEditable="false">
            </div>
        );
    }
}