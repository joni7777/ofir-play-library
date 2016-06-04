import React from 'react';
import $ from 'jquery';
import classNames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import { API_URL } from '../../../scripts/config.js';

import CategoryMenuRow from './row.js';
import './categories.scss';

const TextGeneratorCategories = React.createClass({
  mixins: [onClickOutside],
  propTypes: {
    onCategoryChange: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      selectedParentCategory: {},
      isMenuOpened: false
    };
  },

  handleLabelClick() {
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
  },

  handleClickOutside() {
    this.setState({ isMenuOpened: false });
  },

  handleRowClick(categoryToSelect) {
    return () => {
      let newState = { selectedCategory: categoryToSelect };

      if(!!categoryToSelect.children) {
        newState.selectedParentCategory = categoryToSelect;
      } else {
        newState.isMenuOpened = false;
      }

      this.setState(
        newState,
        () => this.props.onCategoryChange(categoryToSelect)
      );
    }
  },

  populateCategoriesMenu(categories = this.props.categories) {
    return _.map(categories, (category, key) => {
      return (
        <CategoryMenuRow
          key={category.id}
          onClick={this.handleRowClick(category)}
          isSelected={category.id === this.props.selectedCategory.id || category.id === this.state.selectedParentCategory.id}
          category={category}>

          {!!category.children && this.populateCategoriesMenu(category.children)}

        </CategoryMenuRow>
      );
    });
  },

  render() {
    let dropdownClasses = classNames({
      'text-generator-categories-dropdown': true,
      'text-generator-categories-dropdown--opened': this.state.isMenuOpened,
    });

    return (
      <div className="text-generator-categories">
        <div className="text-generator-categories-label common-label">Choose a Category</div>

        <div className={dropdownClasses}>
          <div
            onClick={this.handleLabelClick}
            className="text-generator-categories-dropdown-label">{this.props.selectedCategory.title}</div>

          {this.state.isMenuOpened &&
            <div className="text-generator-categories-dropdown-menu">
              {this.populateCategoriesMenu()}
            </div>
          }
        </div>
      </div>
    );
  }
});

TextGeneratorCategories.propTypes = {
  onCategoryChange: React.PropTypes.func.isRequired,
  categories: React.PropTypes.array.isRequired,
  selectedCategory: React.PropTypes.object.isRequired,
};

export default TextGeneratorCategories;

