import React from 'react';
import classNames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import RadioGroup from 'react-radio-group';
import './dropdown.scss';

const Dropdown = React.createClass({
  mixins: [onClickOutside],
  propTypes: {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired,
    onClose: React.PropTypes.func
  },

  getInitialState() {
    return {
      isMenuOpened: false,
      selectedValueTitle: '',
      selectedValue: '',
      value: ''
    };
  },

  toggleDropdownMenu() {
    if(this.state.isMenuOpened) {
      this.dropdownCancel();
    }
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
  },

  dropdownSubmit() {
    // TODO: this could be better because it relies a lot on given props structure
    this.setState({
      value: this.state.selectedValue,
      selectedValueTitle: _.property('title')(_.find(this.props.items, { id: this.state.selectedValue }))
    });

    this.closeDropdownMenu();
  },

  componentDidMount() {
    if (this.props.selectedValue) {
      var item = (this.props.items || []).find(function (item) {
        return item.id + '' === this.props.selectedValue + '';
      }.bind(this));
      if (item) {
        this.setState({
          selectedValue: item.id,
          selectedValueTitle: item.title,
          value: item.id
        });
      }
    }
  },

  dropdownCancel() {
    this.setState({
        selectedValue: this.state.value,
        value: this.state.value,
      },
      () => this.closeDropdownMenu()
    );
  },

  closeDropdownMenu() {
    this.setState(
      { isMenuOpened: false },
      () => this.props.onClose(this.state.value)
    );
  },

  handleClickOutside() {
    if(this.state.isMenuOpened) {
      this.dropdownCancel();
    }
  },

  handleSelectionChange(value) {
    this.setState({ selectedValue: value });
  },

  render() {
    let dropdownClasses = classNames({
      "common-dropdown": true,
      "common-dropdown--opened": this.state.isMenuOpened
    });

    return (
      <div className={dropdownClasses}>
        <div className="common-dropdown-label" onClick={this.toggleDropdownMenu}>
          <div className="common-dropdown-label__name">{this.props.label}</div>
          <div className="common-dropdown-label__selected-value">{this.state.selectedValueTitle || this.props.defaultTitle}</div>
        </div>

        <div className="common-dropdown-menu">
          <div className="common-dropdown-menu__list">
            <RadioGroup name={this.props.id} selectedValue={this.state.selectedValue} onChange={this.handleSelectionChange}>
            {Radio => {
              return (
                <div>
                  <label>
                    <Radio value="" />All
                  </label>
                  {this.props.items.map(item => (
                    <label key={item.id}>
                      <Radio value={item.id} />{item.title}
                    </label>
                  ))}
                </div>
              )
            }}
            </RadioGroup>
          </div>

          <div className="common-dropdown-menu__footer">
            <button className="common-button common-button--inverted" onClick={this.dropdownCancel}>Cancel</button>
            <button className="common-button" onClick={this.dropdownSubmit}>Apply</button>
          </div>
        </div>
      </div>
    );
  }
});

export default Dropdown;
