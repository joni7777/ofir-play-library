import React from 'react';

import './column.scss';

export default React.createClass({
  render() {
    return (
      <div className="column">{this.props.children}</div>
    );
  }
});
