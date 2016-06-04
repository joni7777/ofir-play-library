import React from 'react';

import './row.scss';

export default React.createClass({
  render() {
    return (
      <div className="row">
        <h3>{this.props.title}</h3>
        <div className="row__content">{this.props.children}</div>
      </div>
    );
  }
});
