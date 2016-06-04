import React from 'react';
import Select from 'react-select';

import 'react-select/dist/react-select.css';
import './index.scss';

export default React.createClass({
  render() {
    return (
      <Select
        name={this.props.name}
        value={this.props.value}
        multi={this.props.multi}
        options={this.props.options}
        optionRenderer={this.props.optionRenderer}
        onChange={this.props.onChange} />
    );
  }
});
