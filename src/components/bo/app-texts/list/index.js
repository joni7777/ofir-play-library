import React from 'react';
import ReactTooltip from 'react-tooltip';

import { Table, TableHead, TableBody, TableRow, TableHeadCol, TableCol, TableRevealOnHover } from './table';
import Icon from '../../../common/icon';
import IconButton from '../../../common/icon-button';
import Empty from './empty';

import scroll from 'react-infinite-scroll';
var InfiniteScroll = scroll(React);

const noop = function () {};

export default React.createClass({

  deleteText(id) {
    return function () {
      (this.props.deleteText || noop)(id);
    }.bind(this);
  },

  openText(id) {
    return function () {
      (this.props.openText || noop)(id);
    }.bind(this);
  },

  loadMore(page) {
    (this.props.loadMore || noop)(page);
  },

  calculateVariants(text) {
    var target = text.suggestions || {};
    return Object
      .keys(target)
      .reduce(function (prev, curr) {
        return prev * ((target[curr] || []).length || 1);
      }, 1);
  },

  render() {
    return (
      <div>
        <ReactTooltip id='edit-text' effect='solid'>Edit this text</ReactTooltip>
        <ReactTooltip id='delete-text' effect='solid'>Permanently delete this text</ReactTooltip>
        <InfiniteScroll pageStart={-1} hasMore={this.props.hasMore} loadMore={this.loadMore}>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCol>Text String</TableHeadCol>
                <TableHeadCol>SEO</TableHeadCol>
                <TableHeadCol align="right">Rank</TableHeadCol>
                <TableHeadCol align="right">Views</TableHeadCol>
                <TableHeadCol align="right">Variants</TableHeadCol>
                <TableHeadCol align="right"></TableHeadCol>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.texts.map(text => (
                <TableRow key={text.id} onClick={this.openText(text.id)}>
                  <TableCol>{text.text}</TableCol>
                  <TableCol>
                    {text.seo ? <Icon type="done" color="#0F9044"/> : null}
                  </TableCol>
                  <TableCol align="right">{text.rank}</TableCol>
                  <TableCol align="right">{text.views}</TableCol>
                  <TableCol align="right">{this.calculateVariants(text)}</TableCol>
                  <TableCol align="right">
                    <TableRevealOnHover>
                      <IconButton icon="mode_edit" onClick={this.openText(text.id)} tooltip="edit-text" />
                      <IconButton icon="delete" color="#F04141" onClick={this.deleteText(text.id)} tooltip="delete-text" />
                    </TableRevealOnHover>
                  </TableCol>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfiniteScroll>
        {this.props.texts.length === 0 ? <Empty /> : ''}
      </div>
    );
  }
});
