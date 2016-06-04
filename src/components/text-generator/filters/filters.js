import React from 'react';
import $ from 'jquery';
import _ from 'lodash';

import { API_URL } from '../../../scripts/config.js';
import Dropdown from '../../common/dropdown/dropdown.js';
import './filters.scss';

class TextGeneratorFilters extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDropdownClose(filterType) {
    return function(dropdownValue) {
      this.props.onFilterChange({ [filterType]: dropdownValue });
    }
  }

  render() {
    return (
      <div className="text-generator-filters">
        <Dropdown
          label="I need a text for:"
          id="sections"
          items={this.props.sections}
          selectedValue={this.props.filter.section}
          defaultTitle="All"
          onClose={this.handleDropdownClose('section').bind(this)} />

        <Dropdown
          label="I'd like to say:"
          id="intents"
          items={this.props.intents}
          defaultTitle="All"
          onClose={this.handleDropdownClose('intent').bind(this)} />

        <Dropdown
          label="Text tone & style:"
          id="styles"
          items={this.props.styles}
          defaultTitle="All"
          onClose={this.handleDropdownClose('style').bind(this)} />
      </div>
    );
  }
}

TextGeneratorFilters.propTypes = {
  onFilterChange: React.PropTypes.func.isRequired,
  sections: React.PropTypes.array,
  intents: React.PropTypes.array,
  styles: React.PropTypes.array
};

TextGeneratorFilters.defaultProps = {
  sections: [],
  intents: [],
  styles: []
};
export default TextGeneratorFilters;
