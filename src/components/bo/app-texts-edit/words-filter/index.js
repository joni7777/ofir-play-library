import React from 'react';
import classNames from 'classnames';

import './index.scss';

export default React.createClass({
  onWordSelected(word) {
    var self = this;
    return function () {
      self.props.onWordSelected(word.title, word.id);
    };
  },
  render() {
    return (
      <div className="words-filter">
        <h3>SEO Words</h3>
        <div className="words-filter__content">
          {this.props.words.map(function (word) {
            return (
              <span key={word.id}
                    onClick={this.onWordSelected(word)}
                    className={'rank-' + word.rank}>{word.title}</span>
            );
          }.bind(this))}
        </div>
      </div>
    );
  }
});
