import React from 'react';

import './index.scss';

let Table = React.createClass({
  render() {
    return (
      <table className="table">{this.props.children}</table>
    );
  }
});

let TableHead = React.createClass({
  render() {
    return (
      <thead>{this.props.children}</thead>
    );
  }
});

let TableBody = React.createClass({
  render() {
    return (
      <tbody>{this.props.children}</tbody>
    );
  }
});

let TableRow = React.createClass({
  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  },
  render() {
    return (
      <tr onClick={this.onClick}>{this.props.children}</tr>
    );
  }
});

let TableHeadCol = React.createClass({
  render() {
    if (this.props.align) {
      return (<th style={{textAlign: this.props.align}}>{this.props.children}</th>)
    }
    return (<th>{this.props.children}</th>);
  }
});

let TableCol = React.createClass({
  render() {
    if (this.props.align) {
      return (<td style={{textAlign: this.props.align}}>{this.props.children}</td>);
    }
    return (<td>{this.props.children}</td>);
  }
});

let TableRevealOnHover = React.createClass({
  render() {
    return (
      <div className="table__on_hover">{this.props.children}</div>
    );
  }
});

export {Table, TableHead, TableBody, TableRow, TableHeadCol, TableCol, TableRevealOnHover}
