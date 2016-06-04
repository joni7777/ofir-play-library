'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

var Line = React.createClass ({
  displayName: 'text-line',
  getInitialState: function() {
    return {
      text: '',
      words: [],
      height: 0,
      widths: []
    }
  },
  render: function() {
    return (<span ref="line">{this.state.text}</span>)
  },
  addLetter: function(letter) {
    var line = ReactDOM.findDOMNode(this.refs.line);
    function encode(l) {
      if (l === ' ') {
        return '\u00a0';
      }
      return l;
    }
    this.state.text += encode(letter);
    line.innerHTML = this.state.text;
  },
  getCharPosition: function(pos) {
    var sum = 0;
    for (var i = 0; i < pos; i++) {
      sum += this.state.widths[i];
    }
    return {
      x: sum,
      y: this.props.number * this.state.height
    }
  },
  setHeight: function(h) {
    this.setState({ height: h });
  },
  addWidth: function(w) {
    this.state.widths.push(w);
    this.setState({widths: this.state.widths});
  },
  minDistance: function(x, y) {
    var self = this;
    var minDist = this.state.widths.reduce(function(prev, curr, index) {
      var currentWidth = prev.sum + curr;
      var ly = self.props.number * self.state.height + self.state.height / 2;
      var lx = prev.sum + curr / 2;
      var dist = Math.sqrt(Math.pow(ly - y, 2) + Math.pow(lx - x, 2));
      return {
        sum: prev.sum + curr,
        dist: Math.min(prev.dist, dist),
        index: dist < prev.dist ? index : prev.index
      };
    }, {sum: 0, dist: 100000, index: 0});
    return minDist;
  }
});

export default Line;
