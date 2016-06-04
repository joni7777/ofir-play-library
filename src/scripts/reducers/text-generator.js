import { combineReducers } from 'redux';

function filter(state = {}, action) {
  switch(action.type) {
    case 'SET_FILTER':
      return Object.assign({}, state, action.filter);

    default:
      return state;
  }
}

function tags(state = { categories: [] }, action) {
  switch(action.type) {
    case 'SET_TAGS':
      return Object.assign({}, state, action.tags);

    default:
      return state;
  }
}

function texts(state = { count: 0, data: [] }, action) {
  switch(action.type) {
    case 'SET_TEXTS':
      return action.texts;

    default:
      return state;
  }
}

function status(state = { isLoading: false }, action) {
  switch(action.type) {
    case 'SET_LOADING_STATUS':
      return { isLoading: action.isLoading };

    default:
      return state;
  }
}


export default combineReducers({ filter, tags, texts, status });

