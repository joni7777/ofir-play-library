import { combineReducers } from 'redux';

import {
  SET_SEARCH,
  SELECT_SITE,
  RECEIVE_WORDS,
  UNSELECT_SITE,
  REQUEST_SITES,
  RECEIVE_SITES,
  REQUEST_TAGS,
  RECEIVE_TAGS,
  REQUEST_TEXTS,
  RECEIVE_TEXTS } from './app-bo-actions';

function words(state = [], action) {
  switch (action.type) {
    case RECEIVE_WORDS:
      return action.data;
    default:
      return state;
  }
}

function selectedSites(state = [], action) {
  switch (action.type) {
    case SELECT_SITE:
      return state.concat([action.id]);
    case UNSELECT_SITE:
      return state.filter(function (id) {
        return id !== action.id;
      });
    default:
      return state;
  }
}

function sites(state = {pending: false, data: []}, action) {
  switch (action.type) {
    case REQUEST_SITES:
      return Object.assign({}, state, {pending: true});
    case RECEIVE_SITES:
      return Object.assign({}, state, {data: action.data}, {pending: false});
    default:
      return state;
  }
}

function search(state = {
  query: null,
  categories: [],
  sections: [],
  intents: [],
  styles: [],
  offset: 0
}, action) {
  switch (action.type) {
    case SET_SEARCH:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function tags(state = {
  pending: false,
  categories: [],
  sections: [],
  intents: [],
  styles: []
}, action) {
  switch (action.type) {
    case REQUEST_TAGS:
      return Object.assign({}, state, {pending: true});
    case RECEIVE_TAGS:
      return Object.assign({}, state, action.data, {pending: false});
    default:
      return state;
  }
}

function texts(state = {
  pending: false,
  hasMore: true,
  count: 0,
  data: []
}, action) {

  switch (action.type) {
    case REQUEST_TEXTS:
      return Object.assign({}, state, {pending: true});
    case RECEIVE_TEXTS:
      return Object.assign({}, state, {
        pending: false,
        data: action.data.data,
        count: action.data.count,
        hasMore: action.hasMore
      });
    default:
      return state;
  }
}

export default combineReducers({
  texts, search, tags, sites, selectedSites, words
});
