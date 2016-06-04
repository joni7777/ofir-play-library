import React from 'react';
import Select from '../../../common/select';

import './index.scss';

function simple(tag) {
  return tag.value;
}

export default React.createClass({
  onCategoryChange(_, categories) {
    this.props.onChange({categories: categories.map(simple)});
  },
  onSectionChange(_, sections) {
    this.props.onChange({sections: sections.map(simple)});
  },
  onIntentChange(_, intents) {
    this.props.onChange({intents: intents.map(simple)});
  },
  onStyleChange(_, styles) {
    this.props.onChange({styles: styles.map(simple)});
  },
  buildCategoryRenderer() {
    return function (option) {
      if (option.main) {
        return <div className="select__group">{option.label}</div>;
      }
      return <div className="select__group_item">{option.label}</div>;
    };
  },
  render() {
    return (
      <div className="filter">
        <div className="filter__item">
          <strong>Category</strong>
          <Select name="categories"
                  multi={false}
                  optionRenderer={this.buildCategoryRenderer()}
                  value={this.props.search.categories}
                  options={this.props.tags.categories}
                  onChange={this.onCategoryChange}/>
        </div>
        <div className="filter__item">
          <strong>I need a text for...</strong>
          <Select name="sections"
                  multi={false}
                  value={this.props.search.sections}
                  options={this.props.tags.sections}
                  onChange={this.onSectionChange}/>
        </div>
        <div className="filter__item">
          <strong>I'd like to say...</strong>
          <Select name="intents"
                  multi={false}
                  value={this.props.search.intents}
                  options={this.props.tags.intents}
                  onChange={this.onIntentChange}/>
        </div>
        <div className="filter__item">
          <strong>Text tone &amp; style</strong>
          <Select name="styles"
                  multi={false}
                  value={this.props.search.styles}
                  options={this.props.tags.styles}
                  onChange={this.onStyleChange}/>
        </div>
      </div>
    );
  }
});
