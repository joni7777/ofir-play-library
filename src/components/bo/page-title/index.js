import React from 'react';

import './index.scss';

export default React.createClass({
  render() {
    return (
      <div className="page-title">
        <div className="page-title__left">
          <span className="page-title__primary">{this.props.primary}</span>
          <span className="page-title__secondary">{this.props.secondary}</span>
        </div>
        <div className="page-title__right">
          {this.props.children}
        </div>
      </div>
    );
  }
});
