import React from 'react';
import classNames from 'classnames';

import './index.scss';

const noop = function () {};

export default React.createClass({
  onClick() {
    (this.props.onClick || noop)();
  },
  render() {
    var clazz = classNames({
      button: true,
      'button--secondary': !!this.props.secondary,
      'button--large': this.props.size === 'large',
      'button--small': this.props.size === 'small'
    });
    var href = this.props.href ?
      this.props.href :
      this.props.route ?
        '#' + this.props.route :
        'javascript:void(0)';
    return (
      <a href={href} className={clazz} onClick={this.onClick}>{this.props.children}</a>
    );
  }
});
