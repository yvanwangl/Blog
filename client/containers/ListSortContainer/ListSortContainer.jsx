import React, { Component } from 'react';
import ListSort from '../../components/ListSort/ListSort';
import Icon from 'antd/lib/icon';
import 'antd/dist/antd.css';
require('./index.css');

const dataArray = [
  {
    icon: 'question-circle-o', color: '#FF5500',
    title: 'Senior Product Designer', text: 'Senior Product Designer',
  },
  {
    icon: 'plus-circle-o', color: '#5FC296',
    title: 'Senior Animator', text: 'Senior Animator',
  },
  {
    icon: 'check-circle-o', color: '#2DB7F5',
    title: 'Visual Designer', text: 'Visual Designer'
  },
  {
    icon: 'cross-circle-o', color: '#FFAA00',
    title: 'Computer Engineer', text: 'Computer Engineer'
  },
];
export default class ListSortContainer extends Component {
  static contextTypes = {
    className: React.PropTypes.string,
  };

  static defaultProps = {
    className: 'list-sort-demo',
  };

  render() {
    const childrenToRender = dataArray.map((item, i) => {
      const { icon, color, title, text } = item;
      return (
        <div key={i} className={`${this.props.className}-list`}>
          <div className={`${this.props.className}-icon`}>
            <Icon type={icon} style={{ color }}/>
          </div>
          <div  className={`${this.props.className}-text`}>
            <h1>{title}</h1>
            <p>{text}</p>
          </div>
        </div>
      );
    });
    return (<div className={`${this.props.className}-wrapper`}>
      <div className={this.props.className}>
        <ListSort dragClassName="list-drag-selected"
          appearAnim={{ animConfig: { marginTop: [5, 30], opacity: [1, 0] } }}
        >
          {childrenToRender}
        </ListSort>
      </div>
    </div>)
  }
}