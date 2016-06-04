import React from 'react';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';

import App from './components/bo/app';
import AppTexts from './components/bo/app-texts';
import AppTextsEdit from './components/bo/app-texts-edit';

// This is required for material-ui to work on desktop.
import reactTapEventPlugin from 'react-tap-event-plugin';
reactTapEventPlugin();

// The redux store for storing the state of our app.
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

import reducers from './app-bo-reducers';
const store = createStoreWithMiddleware(reducers);

// Forcing jquery to post/get as JSON.
import $ from 'jquery';
$.ajaxSetup({ dataType: 'json', contentType: 'application/json; charset=UTF-8' });

export default React.createClass({
  onRouteChange() {
    // Make sure a new component is opened at the top of the page.
    // Issues appear when long texts list is being scrolled.
    window.scrollTo(0, 0);
  },
  render: function() {
    return (
      <Provider store={store}>
        <Router onUpdate={this.onRouteChange}>
          <Route component={App}>
            <Route path="/" component={AppTexts} />
            <Route path="/texts/:id" component={AppTextsEdit} />
          </Route>
        </Router>
      </Provider>
    );
  }
});
