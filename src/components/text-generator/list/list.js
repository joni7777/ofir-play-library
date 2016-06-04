import React from 'react';
import { API_URL } from '../../../scripts/config.js';
import $ from 'jquery';
import classNames from 'classnames';

import './list.scss';

class TextGeneratorList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedText: {}
    };
  }

  componentDidMount() {
    this.setState({ selectedText: this.props.selectedText });
  }

  handleTextSelect(selectedText) {
    this.setState(
      { selectedText },
      this.props.onTextChange(selectedText)
    );
  }

  render() {
    if(!this.props.texts.length) {
      return <TextGeneratorListEmpty />
    }

    return (
      <div className="text-generator-list">
      {this.props.texts.map(text => (
        <TextListRow
          key={text.id}
          text={text}
          selectedText={this.state.selectedText}
          onTextClick={this.handleTextSelect.bind(this)} />
      ))}
      </div>
    );
  }
};

TextGeneratorList.propTypes = {
  onTextChange: React.PropTypes.func.isRequired,
  selectedText: React.PropTypes.object.isRequired
};

const TextGeneratorListEmpty = () => (
  <div className="text-generator-list-empty">Nothing found :(</div>
);

const TextListRow = ({ text, onTextClick, selectedText }) => {
  let textListRowClasses = classNames({
    'text-generator-list__row': true,
    'text-generator-list__row--selected': selectedText.id === text.id,
  });

  return (
    <div className={textListRowClasses} onClick={onTextClick.bind(this, text)}>{text.text}</div>
  );
}


export default TextGeneratorList;

