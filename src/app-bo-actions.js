import $ from 'jquery';

import { API_URL } from './scripts/config.js';

export const RECEIVE_WORDS = 'RECEIVE_WORDS';
export const SELECT_SITE   = 'SELECT_SITE';
export const UNSELECT_SITE = 'UNSELECT_SITE';
export const REQUEST_SITES = 'REQUEST_SITES';
export const RECEIVE_SITES = 'RECEIVE_SITES';
export const SET_SEARCH    = 'SET_SEARCH';
export const REQUEST_TAGS  = 'REQUEST_TAGS';
export const RECEIVE_TAGS  = 'RECEIVE_TAGS';
export const REQUEST_TEXTS = 'REQUEST_TEXTS';
export const RECEIVE_TEXTS = 'RECEIVE_TEXTS';

export function updateText(id, text) {
  return function (dispatch, getState) {
    $.post(`${API_URL}texts/${id}`, JSON.stringify(text)).then(function () {
      dispatch(setSearch({ offset: 0 }));
      __fetchTexts(dispatch, getState);
    });
  };
}

export function createText(text) {
  return function (dispatch, getState) {
    $.post(`${API_URL}texts`, JSON.stringify(text)).then(function () {
      dispatch(setSearch({ offset: 0 }));
      __fetchTexts(dispatch, getState);
    });
  };
}

function __fetchWords(dispatch) {
  $.get(`${API_URL}/assistant/words`).then(function (words) {
    dispatch({ type: RECEIVE_WORDS, data: words });
  });
}
export function fetchWords() {
  return __fetchWords;
}

export function selectSite(id) {
  return function (dispatch) {
    dispatch({ type: SELECT_SITE, id: id });
    __fetchWords(dispatch);
  };
};

export function unselectSite(id) {
  return function (dispatch) {
    dispatch({ type: UNSELECT_SITE, id: id });
    __fetchWords(dispatch);
  };
}

export function fetchSites() {
  return function (dispatch, getState) {
    if (getState().sites.pending) {
      return;
    }
    if (getState().sites.data.length) {
      return;
    }
    dispatch({type: REQUEST_SITES});
    $.get(`${API_URL}assistant/sites`).then(function (sites) {
      dispatch({ type: RECEIVE_SITES, data: sites });
      __fetchWords(dispatch);
    });
  };
}

function setSearch(query) {
  return { type: SET_SEARCH, data: query };
}

function requestTags() {
  return { type: REQUEST_TAGS };
}

function receiveTags(tags) {
  return { type: RECEIVE_TAGS, data: tags };
}

function requestTexts() {
  return { type: REQUEST_TEXTS };
}

function receiveTexts(texts, hasMore) {
  return { type: RECEIVE_TEXTS, data: texts, hasMore: hasMore };
}

export function deleteText(id) {
  return function (dispatch, getState) {
    if (getState().texts.pending) {
      return;
    }
    dispatch(requestTexts());
    $.ajax({url: `${API_URL}texts/${id}`, type: 'DELETE', complete: function () {
      dispatch(setSearch({ offset: getState().search.offset - 1 }));
      dispatch(receiveTexts({
        data: getState().texts.data.filter(function (text) {
          return text.id !== id;
        }),
        count: getState().texts.count - 1
      }, getState().search.hasMore));
    }});

  };
}

function buildQuery(data) {
  var query = [];
  if (data.query) { query.push('text=' + encodeURIComponent(data.query)); }
  if (data.categories && data.categories.length) { query.push('category=' + data.categories.join(',')); }
  if (data.sections && data.sections.length) { query.push('section=' + data.sections.join(',')); }
  if (data.intents && data.intents.length) { query.push('intent=' + data.intents.join(',')); }
  if (data.styles && data.styles.length) { query.push('style=' + data.styles.join(',')); }
  if (data.offset) { query.push('offset=' + data.offset); }
  return query.join('&');
}

function __fetchTexts(dispatch, getState) {
  if (!getState().texts.pending) {
    dispatch(requestTexts());
    return $.get(`${API_URL}texts?` + buildQuery(getState().search)).then(function (texts) {
      dispatch(receiveTexts(texts, texts.data.length === 20));
    });
  } else {
    return Promise.resolve();
  }
};

export function fetchTexts() {
  return __fetchTexts;
};

export function fetchMoreTexts() {
  return function (dispatch, getState) {
    if (!getState().texts.pending) {
      dispatch(requestTexts());
      dispatch(setSearch({offset: getState().search.offset + 20}));
      return $.get(`${API_URL}texts?` + buildQuery(getState().search)).then(function (texts) {
        dispatch(receiveTexts({
          data: getState().texts.data.concat(texts.data),
          count: texts.count
        }, texts.data.length === 20));
      });
    } else {
      return Promise.resolve();
    }
  };
};

export function search(data) {
  return function (dispatch, getState) {
    dispatch(setSearch(Object.assign({}, data, {offset: 0})));
    return __fetchTexts(dispatch, getState);
  };
};

function mapSimpleTag(tag, main) {
  return {value: tag.id.toString(), label: tag.title, main: main === true};
}

function mapTreeTags(tags) {
  return [].concat.apply([], tags.map(function (tag) {
    return [mapSimpleTag(tag, true)].concat(tag.children.map(mapSimpleTag));
  }));
}

export function fetchTags() {
  return function (dispatch) {
    return $.get(`${API_URL}tags`).then(function (tags) {
      dispatch(receiveTags({
        categories: mapTreeTags(tags.categories),
        sections: tags.sections.map(mapSimpleTag),
        intents: tags.intents.map(mapSimpleTag),
        styles: tags.styles.map(mapSimpleTag)
      }));
    });
  };
}
