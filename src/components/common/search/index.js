import React from 'react';

import lodash from 'lodash';
import Icon from '../icon';

import './index.scss';

const noop = function () {};
const ENTER_KEY_CODE = 13;

export default React.createClass({
  search(e) {
    if (e.which === ENTER_KEY_CODE) {
      (this.props.search || noop)(this.refs.input.value);
    }
  },
  componentDidMount() {
    this.refs.input.value = this.props.value || '';
  },
  onChange: lodash.throttle(function () {
    if (this.props.search) {
      this.props.search(this.refs.input.value);
    }
  }, 700),
  onClick() {
    this.refs.input.focus();
  },
  render() {
    return (
      <div className="search">
        <input ref="input" className="search__input" placeholder={this.props.placeHolder} onKeyUp={this.search} onChange={this.onChange}/>
        <span className="search__icon" onClick={this.onClick}>
          <Icon type="search" />
        </span>
      </div>
    );
  }
});
