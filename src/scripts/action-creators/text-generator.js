import $ from 'jquery';
import { API_URL } from '../config.js';

const createQuery = source => _(source)
                                .pick(_.identity)
                                .map((value, name) => `${name.replace(/s$/, '')}=${value}`)
                                .value()
                                .join('&');

const fetchTexts = (dispatch, getState) => {
  let query = createQuery(getState().filter);

  return $.get(`${API_URL}texts?${query}`).then(texts => {
    dispatch(setTexts(texts));
  });
};

const fetchTags = (dispatch, getState) => {
  let query = createQuery(getState().filter);

  dispatch(setLoadingStatus(true));
  return $.get(`${API_URL}tags?${query}`).then(tags => {
    dispatch(setTags(tags));

    if(!getState().filter.category) {
      dispatch(setFilter({ category: tags.categories[0].id }));
    } else {
      fetchTexts(dispatch, getState);
    }

    // you naughty naughty
    setTimeout(() => {
      dispatch(setLoadingStatus(false));
    }, 500);
  });
};

export function setTexts(texts) {
  return {
    type: 'SET_TEXTS',
    texts
  };
}

export function setFilter(filter) {
  return (dispatch, state) => {
    if (filter.category && filter.category !== state().filter.category) {
      filter.section = null;
      filter.intent = null;
      filter.style = null;
    }

    if(filter.section && filter.section !== state().filter.section) {
      filter.intent = null;
      filter.style = null;
    }

    if(filter.intent && filter.intent !== state().filter.intent) {
      filter.style = null;
    }

    dispatch({
      type: 'SET_FILTER',
      filter
    });

    fetchTags(dispatch, state);
  };
};

export function resetFilter() {
  return (dispatch, state) => {
    dispatch({
      type: 'SET_FILTER',
      filter: {}
    })
  };
};

export function setInitialFilter(filter) {
  return (dispatch, state) => {
    dispatch({
      type: 'SET_FILTER',
      filter
    });

    fetchTags(dispatch, state);
  };
};

export function setCategory(categoryId) {
  return setFilter({ category: categoryId });
}

function setLoadingStatus(isLoading) {
  return {
    type: 'SET_LOADING_STATUS',
    isLoading
  }
}

function setTags(tags) {
  return {
    type: 'SET_TAGS',
    tags
  };
}
