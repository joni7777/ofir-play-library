import React from 'react';
import classNames from 'classnames';

class CategoryMenuRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelected: this.props.isSelected // yup, props to state is probably the most simple here
    }
  }

  handleRowClick(event) {
    event.stopPropagation();

    this.setState(
      { isSelected: !this.state.isSelected },
      this.props.onClick()
    );
  }

  render() {
    let rowClasses = classNames({
      'text-generator-categories-dropdown-menu__row': true,
      'text-generator-categories-dropdown-menu__row--selected': this.state.isSelected
    });

    return (
      <div
        onClick={this.handleRowClick.bind(this)}
        className={rowClasses}>
          <div
            className="text-generator-categories-dropdown-menu__row-label">
            {this.props.category.title}
          </div>

          {this.props.children}
      </div>
    );
  }
}

CategoryMenuRow.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  category: React.PropTypes.object.isRequired
};

export default CategoryMenuRow;

