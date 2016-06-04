import React from 'react';

import Icon from '../icon';

import './index.scss';

const noop = function () {};

export default React.createClass({
  onClick(e) {
    (this.props.onClick || noop)();
    e.stopPropagation();
    return true;
  },
  render() {
    var href = this.props.href ?
      this.props.href :
      (this.props.route ?
        '#' + this.props.route :
        'javascript:void(0)');
    return (
      <a href={href} className="icon-button" onClick={this.onClick} data-tip data-for={this.props.tooltip}>
        <Icon type={this.props.icon} color={this.props.color} />
      </a>
    );
  }
});
