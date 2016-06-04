import React from 'react';
import Toggle from 'material-ui/lib/toggle';

import './index.scss';

export default React.createClass({
  toggle: function (id) {
    var self = this;
    return function (event, toggled) {
      self.props.onToggle(id, toggled);
    };
  },
  isChecked: function (id) {
    return this.props.selected.indexOf(id) !== -1;
  },
  render() {
    return (
      <div className="sites-filter">
        <h3>Get ideas from similiar sites</h3>
        <ul>
          {this.props.sites.map(function (site) {
            return (
              <li key={site.id}>
                <Toggle name="site"
                        value={site.id.toString()}
                        label={site.title}
                        labelPosition="right"
                        onToggle={this.toggle(site.id)}
                        checked={this.isChecked(site.id)}/>
              </li>
            );
          }.bind(this))}
        </ul>
      </div>
    );
  }
});
