import React, {Component} from 'react';
/*import {Icon} from "antd-local-icon";*/
require('./index.css');

export default class MediaControls extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {onUploadImage} = this.props;
        return (
            <div className="side-toolbar">
                {/*<Icon
                    type="picture"
                    onMouseDown={e => e.preventDefault()}
                    onClick={onUploadImage}
                />*/}
            </div>
        );
    }
}