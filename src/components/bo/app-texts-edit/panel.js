import React from 'react';

import './panel.scss';

export default React.createClass({
  render() {
    return (
      <div className="panel">
        <div className="panel__header">
          <div className="panel__title">{this.props.title}</div>
          <div className="panel__title_controls">{this.props.titleControls}</div>
        </div>
        <div className="panel__conent">{this.props.children}</div>
      </div>
    );
  }
});
