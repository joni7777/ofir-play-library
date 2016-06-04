import React from 'react';
import ReactDOM from 'react-dom';
import Line from './line';
import Context from './context';
import './orwell.scss';

class Orwell extends React.Component {
  constructor(props) {
    super();
    this.displayName = 'orwell-editor';
    this.contentClick = this.contentClick.bind(this);
    this.contextMenu = this.contextMenu.bind(this);
    this.keydown = this.keydown.bind(this);
    this.contextCallback = this.contextCallback.bind(this);
    this.state = {
      text: props.text || '',
      definitions: {},
      lines: [],
      cursorPosition: 0,
      cursorScreenPosition: {x: 0, y: 0}
    }
  }

  render() {
    let cursorStyle = {
      top: this.state.cursorScreenPosition.y,
      left: this.state.cursorScreenPosition.x
    };
    return (
        <div id="editor">
          <cursor ref="cursor" style={cursorStyle}></cursor>
          <div ref="content" onContextMenu={this.contextMenu} onClick={this.contentClick}></div>
          <Context ref="context" callback={this.contextCallback}></Context>
          <textarea ref="input" onKeyDown={this.keydown}></textarea>
        </div>
    )
  }

  componentDidUpdate() {
    this.textToLines(this.state.text, ReactDOM.findDOMNode(this.refs.content));
  }

  componentDidMount() {
    this.textToLines(this.state.text, ReactDOM.findDOMNode(this.refs.content));
  }

  getWord(text, position) {
    let pos = position;
    let word = '';
    while(pos >= 0 && text.charAt(pos) !== ' ') {
      word = text.charAt(pos) + word;
      pos--;
    }
    pos = position + 1;
    while(pos < text.length && text.charAt(pos) !== ' ') {
      word = word + text.charAt(pos);
      pos++;
    }
    return word;
  }

  textToLines(text, content) {
    content.innerHTML = '';
    let that = this;
    let maxWidth = content.offsetWidth;
    let lineNum = 0;
    let ldom = document.createElement('span');
    content.appendChild(ldom);
    let line = ReactDOM.render(React.createElement(Line, {number: lineNum}), ldom);
    let lines = this.state.lines;
    lines.length = 0;
    lines.push(line);
    text.split('').forEach((letter, index) => {
      let startWidth = ldom.offsetWidth;
      if (startWidth + 50 > maxWidth) {
        lineNum++;
        let br = document.createElement('br');
        content.appendChild(br);
        ldom = document.createElement('span');
        content.appendChild(ldom);
        line = ReactDOM.render(React.createElement(Line, {number: lineNum}), ldom);
        lines.push(line);
        startWidth = 0;
      }
      if (that.state.definitions[that.getWord(text, index)]) {
        //line.startMarking();
      } else {
        //line.stopMarking();
      }
      line.addLetter(letter);
      line.forceUpdate();
      let endWidth = ldom.offsetWidth;
      line.addWidth(endWidth - startWidth);
      line.setHeight(Math.max(ldom.offsetHeight, line.state.height));
    });
  }

  contentClick(e) {
    console.log(this);
    this.positionCursor(e.nativeEvent);
    ReactDOM.findDOMNode(this.refs.input).focus();
    this.refs.context.hide();
    this.updateCursor();
  }

  contextCallback(synonym) {
    let word = this.getWord(this.state.text, this.state.cursorPosition);
    if (!this.state.definitions[word]) {
      this.state.definitions[word] = [];
    }
    let definitions = this.state.definitions[word];
    if (definitions.indexOf(synonym) === -1) {
      definitions.push(synonym);
    }
    this.refs.context.hide();
  }

  isCharacterKeyPress(evt) {
    if (typeof evt.which == "undefined") {
      return true;
    } else if (typeof evt.which == "number" && evt.which > 0) {
      return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8;
    }
    return false;
  }

  updateCursor() {
    let sum = 0;
    let lines = this.state.lines;
    for (let i = 0; i < lines.length; i++) {
      if (sum + lines[i].state.widths.length > this.state.cursorPosition) {
        let position = lines[i].getCharPosition(this.state.cursorPosition - sum);
        this.setState({cursorScreenPosition: position});
        break;
      }
      sum += lines[i].state.widths.length;
    }
  }

  keydown(e) {
    let text = this.state.text;
    let cursorPosition = this.state.cursorPosition;
    if (e.keyCode === 8 && this.state.cursorPosition) { // backspace
      text = text.slice(0, cursorPosition - 1) + text.slice(cursorPosition, text.length)
      cursorPosition--;
    } else if (e.keyCode === 46 && cursorPosition !== text.length) { // delete
      text = text.slice(0, cursorPosition) + text.slice(cursorPosition + 1, text.length)
    } else if (e.keyCode === 37 && cursorPosition > 0) {
      cursorPosition--;
    } else if (e.keyCode === 39 && cursorPosition < text.length) {
      cursorPosition++;
    } else if (this.isCharacterKeyPress(e) && ((e.keyCode > 47 && e.keyCode < 91) || e.keyCode === 32 || e.keyCode > 186)) {
      let c = String.fromCharCode(e.which);
      if (!e.shiftKey) {
        c = c.toLowerCase();
      }
      text = text.slice(0, cursorPosition) + c  + text.slice(cursorPosition, text.length);
      cursorPosition++;
    }
    this.setState({text: text, cursorPosition: cursorPosition}, () => this.updateCursor());
  }

  contextMenu(ev) {
    ev.preventDefault();
    this.positionCursor(ev.nativeEvent);
    let word = this.getWord(this.state.text, this.state.cursorPosition);
    if (!this.state.definitions[word]) {
      this.state.definitions[word] = [word];
    }
    let definitions =  this.state.definitions[word];
    this.refs.context.show(ev.nativeEvent, definitions);
    return false;
  }

  positionCursor(e) {
    let mins = this.state.lines.map((line) => {
      return line.minDistance(e.offsetX, e.offsetY).dist;
    });
    let minIndex = mins.reduce((prev, curr, index, arr) => {
      if(arr[prev] > arr[index]) {
        return index;
      }
      return prev;
    }, 0);
    let line = this.state.lines[minIndex];
    let dist = line.minDistance(e.offsetX, e.offsetY);
    let cursorPosition = 0;
    for (let i = 0; i < minIndex; i++) {
      cursorPosition += this.state.lines[i].state.widths.length;
    }
    cursorPosition += dist.index;
    this.setState({cursorPosition: cursorPosition}, () => this.updateCursor());
  }
};

export default Orwell;

