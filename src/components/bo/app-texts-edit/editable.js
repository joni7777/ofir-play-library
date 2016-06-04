import React from 'react';
import _ from 'lodash';
import Popover from 'material-ui/lib/popover/popover';

import Button from '../../common/button';
import IconButton from '../../common/icon-button';

import './editable.scss';

export default React.createClass({

  getValue() {
    var el = this.refs.editable;
    return {
      text: el.innerText || '',
      html: el.innerHTML || '',
      suggestions: this.state.suggestions || {}
    };
  },

  setValue(value)  {
    this.refs.editable.innerHTML = (value.html ? value.html : value.text) || '';
    this.setState({ suggestions: value.suggestions || {} });
  },

  focus() {
    this.refs.editable.focus();
  },

  getInitialState() {
    return {
      suggestions: {},
      collapsed: true,
      clashing: false,
      inSpan: false,
      selected: false,
      range: null
    };
  },

  componentDidMount() {
    document.addEventListener('selectionchange', this.onSelectionChanged);
  },

  componentWillUnmount() {
    document.removeEventListener('selectionchange', this.onSelectionChanged);
  },

  onSelectionChanged(e) {
    if (document.activeElement && document.activeElement === this.refs.editable) {
      this.handleSelection();
    }
  },

  getSuggestId(node, checkParent) {
    var id = (node && node.getAttribute) ? node.getAttribute('suggest-id') : '';
    return id ? id : (checkParent === false ? '' : this.getSuggestId(node.parentNode, false));
  },

  handleSelection() {

    function isInSpan(node, maxLevels) {
      if (node.nodeName === 'SPAN') {
        return true;
      }
      return (maxLevels > 0) ? isInSpan(node.parentElement, --maxLevels) : false;
    }

    var range = window.getSelection().getRangeAt(0);

    var inSpan = false,
        clashing = false;

    if (isInSpan(range.startContainer, 10)) {
      inSpan = true;
    }

    if (isInSpan(range.endContainer, 10)) {
      inSpan = true;
    }

    if (range.endContainer !== range.startContainer) {
      clashing = true;
    }

    var spanId = this.getSuggestId(range.startContainer);
    var spanText = '';
    if (spanId) {
      let el = this.refs.editable.querySelector('[suggest-id="' + spanId + '"]');
      spanText = el ? el.innerText : '';
    }
    this.setState({
      collapsed: range.collapsed,
      clashing: clashing,
      inSpan: !clashing && inSpan,
      selected: !clashing && !range.collapsed,
      spanId: spanId,
      spanText: spanText,
      range: range
    });
  },

  resetState() {
    this.setState({ collapsed: true, clashing: false, inSpan: false, selected: false, spanId: null, range: null, spanText: '' });
  },

  removeSpan() {
    var child = document.createTextNode(this.state.range.startContainer.textContent);
    this
      .state
      .range
      .startContainer
      .parentNode
      .parentNode
      .replaceChild(child, this.state.range.startContainer.parentNode);
    this.resetState();
  },

  onContextMenu(e) {
    if (!this.state.collapsed &&
        !this.state.clashing &&
        !this.state.inSpan) {
      this.addSpan();
    }
    e.stopPropagation();
    e.preventDefault();
    return true;
  },

  getSuggestionsAsPlainText() {
    return (this.state.suggestions[this.state.spanId] || []).join('\n');
  },

  onSuggestionChange(e) {
    var s = this.state.suggestions;
    if (!s[this.state.spanId]) {
      s[this.state.spanId] = {};
    }
    s[this.state.spanId] = e.target.value.split(/[,\n]/);
    this.setState({
      suggestions: s
    });
  },

  addSpan() {
    var span = document.createElement('span');
    span.setAttribute('suggest-id', 'the-library-' + (new Date()).getTime());
    this.state.range.surroundContents(span);
    window.getSelection().selectAllChildren(span);
  },

  render() {
    return (
      <div>
        <div ref="anchor"></div>
        <div ref="editable"
             contentEditable="true"
             autoComplete="off"
             autoCorrect="off"
             autoCapitalize="off"
             spellCheck="false"
             onContextMenu={this.onContextMenu}
             className="the-library-editable">
        </div>
        <Popover
          open={this.state.inSpan}
          anchorEl={this.refs.anchor}
          animated={false}
          autoCloseWhenOffScreen={false}
          anchorOrigin={{vertical:'bottom', horizontal: 'middle'}}
          targetOrigin={{vertical:'bottom', horizontal: 'middle'}}
          >
          <div className="editable-popover">
            <div className="editable-popover__text">{this.state.spanText}</div>
            <textarea value={this.getSuggestionsAsPlainText()} onChange={this.onSuggestionChange}></textarea>
            <div className="editable-popover__actions">
              <Button size="small" onClick={this.resetState}>Done</Button>
              <IconButton icon="delete" color="#F04141" onClick={this.removeSpan} />
            </div>
          </div>
        </Popover>
      </div>
    );
  }
});
