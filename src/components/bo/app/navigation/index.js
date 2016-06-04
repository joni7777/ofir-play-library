import React from 'react';
import classNames from 'classnames';

import './index.scss';

const MenuItem = React.createClass({
  render() {
    const clazz = classNames({
      'left-nav__menu_item': true,
      'left-nav__menu_item--selected': this.props.history.isActive(this.props.item.route)
    });
    return (<a href={`#${this.props.item.route}`} className={clazz}>{this.props.item.label}</a>);
  }
});

export default React.createClass({
  render() {
    return (
      <div className="left-nav">
        <div className="left-nav__product_logo"></div>
        <div className="left-nav__product_name"></div>
        <div className="left-nav__menu">
          {this.props.items.map((item) => (
            <MenuItem key={item.route} item={item} history={this.props.history}/>
          ))}
        </div>
      </div>
    );
  }
});
