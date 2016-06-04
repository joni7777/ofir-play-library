import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';

import PageTitle from '../page-title';
import Icon from '../../common/icon';
import IconButton from '../../common/icon-button';
import Button from '../../common/button';
import Search from '../../common/search';
import TagsFilter from './tags-filter';
import List from './list';
import { search, fetchTexts, fetchMoreTexts, fetchTags, deleteText } from '../../../app-bo-actions.js';

import './index.scss';

import scroll from 'react-infinite-scroll';
var InfiniteScroll = scroll(React);

const AppTexts = React.createClass({

  componentDidMount() {
    this.props.dispatch(fetchTags());
  },

  onSearch(text) {
    this.props.dispatch(search({ query: text }));
  },

  loadMore(page) {
    this.props.dispatch((page === 0 ? fetchTexts : fetchMoreTexts)());
  },

  deleteText(id) {
    this.props.dispatch(deleteText(id));
  },

  openText(id) {
    this.props.history.replaceState(null, '/texts/' + id);
  },

  onFilterChange(filter) {
    this.props.dispatch(search(filter));
  },

  render() {
    return (
      <div>
        <PageTitle primary="Texts" secondary={<span>({this.props.texts.count})</span>}>
          <Search placeHolder="" search={this.onSearch} value={this.props.search.query}/>
          <Button route="/texts/new">Add New Text</Button>
        </PageTitle>
        <TagsFilter
          onChange={this.onFilterChange}
          search={this.props.search}
          tags={this.props.tags} />
        <List texts={this.props.texts.data}
              hasMore={this.props.texts.hasMore}
              loadMore={this.loadMore}
              deleteText={this.deleteText}
              openText={this.openText}/>
      </div>
    );
  }
});

export default connect(function (state) {
  return state;
})(AppTexts);
