'use strict';

const lodash = require('lodash');

module.exports = function (db) {

  var texts = function () {
    return db.getCollection('texts');
  };

  var id = function () {
    return lodash.last(texts().chain().simplesort('id').data()).id + 1;
  };

  function withoutInternals(input) {
    return {
      id:          input.id          || '',
      categories:  input.categories  || [],
      sections:    input.sections    || [],
      intents:     input.intents     || [],
      styles:      input.styles      || [],
      views:       input.views       || 0,
      rank:        input.rank        || 0,
      impression:  input.impression  || 0,
      provider:    input.provider    || '',
      seo:         input.seo         || false,
      text:        input.text        || '',
      html:        input.html        || '',
      suggestions: input.suggestions || {}
    };
  }

  function filterTrue() {
    return true;
  }

  function filterByImpression(query) {
    return query.impression ? function (text) {
      return text.impression >= query.impression;
    } : filterTrue;
  }

  function filterByRank(query) {
    return query.rank ? function (text) {
      return text.rank >= query.rank;
    } : filterTrue;
  }

  function filterByProvider(query) {
    return query.provider ? function (text) {
      return text.provider === query.provider;
    } : filterTrue;
  }

  function filterByText(query) {
    return query.text ? function (text) {
      return lodash.contains(text.text.toLowerCase(), query.text.toLowerCase());
    } : filterTrue;
  }

  function filterBySeo(query) {
    return lodash.isUndefined(query.seo) ? filterTrue : function (text) {
      return !!query.seo ? text.seo === true : text.seo === false;
    };
  }

  function filterByTag(query, field) {
    return query ? function (text) {
      return lodash.difference(query, text[field]).length !== query.length;
    } : filterTrue;
  }

  function firstDefinedValue() {
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] !== 'undefined') {
        return arguments[i];
      }
    }
    return undefined;
  }

  return {
    add: function (text) {
      text.id = id();
      texts().insert(text);
      db.saveDatabase();
      return withoutInternals(text);
    },
    update: function (id, text) {
      var toUpdate = texts().findOne({id: id});
      toUpdate.categories  = firstDefinedValue(text.categories  ,toUpdate.categories,  []);
      toUpdate.sections    = firstDefinedValue(text.sections    ,toUpdate.sections,    []);
      toUpdate.intents     = firstDefinedValue(text.intents     ,toUpdate.intents,     []);
      toUpdate.styles      = firstDefinedValue(text.styles      ,toUpdate.styles,      []);
      toUpdate.views       = firstDefinedValue(text.views       ,toUpdate.views,       0);
      toUpdate.rank        = firstDefinedValue(text.rank        ,toUpdate.rank,        0);
      toUpdate.impression  = firstDefinedValue(text.impression  ,toUpdate.impression,  0);
      toUpdate.provider    = firstDefinedValue(text.provider    ,toUpdate.provider,    'wix');
      toUpdate.text        = firstDefinedValue(text.text        ,toUpdate.text,        '');
      toUpdate.html        = firstDefinedValue(text.html        ,toUpdate.html,        '');
      toUpdate.suggestions = firstDefinedValue(text.suggestions ,toUpdate.suggestions, {});
      toUpdate.seo         = firstDefinedValue(text.seo         ,toUpdate.seo,         false);
      texts().update(toUpdate);
      db.saveDatabase();
      return withoutInternals(toUpdate);
    },
    removeById: function (id) {
      texts().removeWhere({id: id});
      db.saveDatabase();
    },
    findSuggestionsById: function (id) {
      var found = lodash.first(texts()
        .chain()
        .find({id: id})
        .data());
      return (found ? found.suggestions : {}) || {};
    },
    findById: function (id) {
      return lodash.first(texts()
        .chain()
        .find({id: id})
        .data()
        .map(withoutInternals));
    },
    find: function (query) {
      var chain = texts()
        .chain()
        .where(filterByTag(query.category, 'categories'))
        .where(filterByTag(query.section, 'sections'))
        .where(filterByTag(query.intent, 'intents'))
        .where(filterByTag(query.style, 'styles'))
        .where(filterBySeo(query))
        .where(filterByImpression(query))
        .where(filterByRank(query))
        .where(filterByProvider(query))
        .where(filterByText(query));

      return {
        count: chain.data().length,
        data: chain
          .compoundsort([['id', false]])
          .offset(query.offset || 0)
          .limit(query.limit || 20)
          .data()
          .map(withoutInternals)
      };
    }
  };

};
