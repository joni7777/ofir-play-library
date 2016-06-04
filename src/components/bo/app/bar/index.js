import React from 'react';

import User from './user';

import './index.scss';

export default React.createClass({
  render() {
    return (
      <div className="app-bar">
        <div className="app-bar__logo"></div>
        <div className="app-bar__user">
          <User />
        </div>
      </div>
    );
  }
});
