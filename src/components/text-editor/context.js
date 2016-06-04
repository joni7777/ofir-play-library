import React from 'react';
import ReactDOM from 'react-dom';

var Context = React.createClass({
  displayName: 'context-menu',
  getInitialState: function() {
    return {
      visibility: 'none',
      position: {x: 0, y: 0},
      input: '',
      definitions: []
    }
  },
  render: function() {
    var style = {
      top: this.state.position.y,
      left: this.state.position.x,
      display: this.state.visibility
    };
    return (
      <context style={style}>
        <input onClick={this.inputClick} ref="defInput" value={this.state.input} onChange={this.updateInput}/>
        <button onClick={this.buttonClick}>Add</button>
        <ul>
        {
          this.state.definitions.map(function(def) {
            return (<li>{def}</li>)
          })
        }
        </ul>
      </context>
    )
  },
  updateInput: function(e) {
    this.setState({input: e.target.value})
  },
  show: function(ev, definitions) {
    this.setState({
      visibility: 'block',
      position: {x: ev.offsetX, y: ev.offsetY},
      input: '',
      definitions:  definitions
    });
    ReactDOM.findDOMNode(this.refs.defInput).focus(); 
  },

  hide: function() {
    this.setState({visibility: 'none'});
  },
  inputClick: function(ev) {
    ev.stopPropagation();
    return true;
  },
  buttonClick: function(ev) {
    ev.stopPropagation();
    this.props.callback(this.state.input);
    return true;
  }
});

export default Context;
