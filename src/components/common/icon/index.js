import React from 'react';

export default React.createClass({
  render() {
    return (
      <span className="material-icons" style={{color: this.props.color || ''}}>{this.props.type}</span>
    );
  }
});
