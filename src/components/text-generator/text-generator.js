import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';

import './text-generator.scss';
import { API_URL } from '../../scripts/config.js';
import { setCategory, setInitialFilter, setFilter, resetFilter } from '../../scripts/action-creators/text-generator';

import TextGeneratorCategories from './categories/categories.js';
import TextGeneratorFilters from './filters/filters.js';
import TextGeneratorList from './list/list.js';
import TextGeneratorResults from './results/results.js';

class TextGenerator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      texts: [],
      textsCount: 0,
      selectedText: {}
    };
  }

  componentWillMount() {
    let filter = {};

    if(!!this.props.data) {
      filter = {
        category: this.props.data.categories[0] || 2,
        intent: this.props.data.intents[0] || 1,
        section: this.props.data.sections[0] || 1,
        style: this.props.data.styles[0] || 1,
      };
      this.props.dispatch(setInitialFilter(filter));
    } else {
      this.props.dispatch(setCategory('1'));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetFilter());
  }

  handleTextSelect(selectedText) {
    this.setState(
      { selectedText },
      () => this.props.selectionCallback(selectedText)
    );
  }

  handleFilterChange(newFilter) {
    this.props.dispatch(setFilter(newFilter))
  }

  handleCategoryChange(currentCategory) {
    this.props.dispatch(setCategory(currentCategory.id));
  }

  handleSEOClick(isSEOEnabled) {
    this.props.dispatch(setFilter({ seo: isSEOEnabled ? 1 : 0 }));
  }

  findSelectedCategory() {
    let found = null,
        id = this.props.filter.category + '';

    this.props.tags.categories.forEach(category => {
      if (category.id + '' === id) {
        found = category;
      }

      category.children.forEach(child => {
        if (child.id + '' === id) {
          found = child;
        }

        return found !== null;
      });

      return found !== null;
    });

    return found;
  }

  getFilter() {
    if (this.props.data && this.props.data.sections) {
      return {
        section: this.props.data.sections[0] || null
      };
    }
    return {};
  }
  render() {
    let textGeneratorClasses = classNames({
      'text-generator': true,
      'text-generator--loading': this.props.status.isLoading,
    });

    return (
      <div className={textGeneratorClasses}>
        {this.props.filter.category && this.props.tags.categories.length &&
          <TextGeneratorCategories
            categories={this.props.tags.categories}
            selectedCategory={this.findSelectedCategory.call(this)}
            onCategoryChange={this.handleCategoryChange.bind(this)} />
        }

        {this.props.data &&
         this.props.data.sections &&
         this.props.tags.categories &&
         this.props.tags.categories.length &&
          <TextGeneratorFilters
            sections={this.props.tags.sections}
            intents={this.props.tags.intents}
            styles={this.props.tags.styles}
            filter={this.getFilter()}
            onFilterChange={this.handleFilterChange.bind(this)} />
        }

        <TextGeneratorResults
          isSEOEnabled={this.props.filter.seo || 0}
          onClick={this.handleSEOClick.bind(this)}
          count={this.props.texts.count} />

        <TextGeneratorList
          texts={this.props.texts.data}
          selectedText={this.props.data}
          onTextChange={this.handleTextSelect.bind(this)} />
      </div>
    );
  }
}

TextGenerator.propTypes = {
  data: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    filter: state.filter,
    tags: state.tags,
    texts: state.texts,
    status: state.status
  };
}

export default connect(mapStateToProps)(TextGenerator);
