import React from 'react';
import ReactDOM from 'react-dom';
import './text-editor.scss';

class Editor extends React.Component {
  constructor(props) {
    super();
    this.state = {
      text: props.text,
      status: 'unselected',
      popupStyle: {
      },
      popupClass: 'popup',
      suggestions: {}
    };
    this.click = this.click.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addClick = this.addClick.bind(this);
  }
  click(event) {
    if (this.state.status !== 'find') {
      return;
    }
    if (event.target.nodeName === 'SPAN') {
      let nat = event.nativeEvent;
      let diff = event.target.getBoundingClientRect().top - this.refs.editor.getBoundingClientRect().top + event.target.getBoundingClientRect().height;
      this.setState({
        popupStyle: {
          top: diff + 10,
          left: nat.offsetX - 90,
        },
        popupClass: 'popup visible', synonymInput: '',
        suggestionsFor: event.target.getAttribute('suggest-id')
      }, function() {
        ReactDOM.findDOMNode(this.refs.input).focus();
      });
      this.selectedNode = event.target;
    } else {
      this.hidePoupup();
    }
  }
  synonymClick(text) {
    this.selectedNode.innerHTML = text;
    this.hidePoupup();
  }
  addClick(event) {
    if (this.state.synonymInput) {
      this.selectedNode.innerHTML = this.state.synonymInput;
      this.hidePoupup();
    }
  }
  handleInputChange(event) {
    this.setState({synonymInput: event.target.value});
  }
  hidePoupup() {
    this.setState({popupClass: 'popup', synonymInput: ''});
  }
  preventSubmit(e) {
    e.preventDefault();
    return false;
  }
  render() {
    let self = this;
    let html = {__html: this.state.text};
    let suggestions = this.state.suggestions[this.state.suggestionsFor] || [];
    let pins = new Array(1,2,3,4,5,6,7,8);
    let className = 'text ' + this.props.className;
    let popupClass = this.state.status === 'find' ? this.state.popupClass : 'popup';
    //let editable = this.state.status === 'find';
    let editable = false;
    return (
      <div className="editor-container">
        <div className="inline-editor" ref="editor" style={this.props.position} onClick={this.props.onClick} data-status={this.state.status} contentEditable={editable}>
            {
              pins.map(function(p, i) {
                return (<div key={i} className="pin" data-num={i}></div>);
              })
            }
            <ul className="buttons">
              <li className="edit-button"><span className="label">Edit Text</span></li>
              <li className="edit-button" onClick={this.props.findTextCallback}><span className="label">Find Text</span></li>
            </ul>
            <div className={className} onClick={this.click} dangerouslySetInnerHTML={html}></div>
            <div className={popupClass} style={this.state.popupStyle}>
              <ul>
                {
                  suggestions.map(function(def, i) {
                    let boundHandler = self.synonymClick.bind(self, def);
                    return (<li key={i} onClick={boundHandler}>{def}</li>);
                  })
                }
              </ul>
              <div className="bottom">
              <form action="#" onSubmit={this.preventSubmit}>
                <input ref="input" placeholder="Write Your Own" value={this.state.synonymInput} onChange={this.handleInputChange}/>
                <button onClick={this.addClick}>&gt;</button>
               </form>
              </div>
            </div>
          </div>
        </div>
    )
  }
};

export default Editor;
