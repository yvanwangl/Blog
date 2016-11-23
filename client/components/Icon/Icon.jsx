import React, {Component} from 'react';
import Like from '-!babel!svg-react!./images/like.svg?name=like';
import Dislike from '-!babel!svg-react!./images/dislike.svg?name=dislike';
import Message from '-!babel!svg-react!./images/message.svg?name=message';
import Close from '-!babel!svg-react!./images/close.svg?name=close';
import Image from '-!babel!svg-react!./images/image.svg?name=image';
import Check from '-!babel!svg-react!./images/check.svg?name=check';
require('./index.css');

function getComponent(type){
    let childComponent;
    switch (type) {
        case 'like':
            childComponent=<Like />;
            break;
        case 'dislike':
            childComponent=<Dislike />;
            break;
        case 'message':
            childComponent=<Message />;
            break;
        case 'close':
            childComponent=<Close />;
            break;
        case 'image':
            childComponent=<Image />;
            break;
        case 'check':
            childComponent=<Check />;
            break;
    }
    return childComponent;
}

export default class Icon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {type, className} = this.props;
        let childComponent = getComponent(type);
        return (
            <i className={"customerIcon "+className}>
                {childComponent}
            </i>
        );
    }
}