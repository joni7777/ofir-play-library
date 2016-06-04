import React from 'react';

import Navigation from './navigation';
import Bar from './bar';

import './index.scss';

export default React.createClass({
  render() {
    const items = [
      {label: 'Texts', route: '/'},
      {label: 'Tags', route: '/tags'},
      {label: 'Tags Categories', route: '/categories'}
    ];
    return (
      <div className="app">
        <Navigation items={items} history={this.props.history}/>
        <Bar />
        <div className="app__content">{this.props.children}</div>
      </div>
    );
  }
});
