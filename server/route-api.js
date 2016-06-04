'use strict';

var express = require('express'),
    router = express.Router(),
    db = require('./db'),
    texts = require('./texts')(db),
    categories = require('./categories')(db),
    sections = require('./sections')(db),
    intents = require('./intents')(db),
    styles = require('./styles')(db),
    assistant = require('./assistant')(db);

function toNumber(value) {
  return parseInt(value, 10);
}

function toNumberList(param) {
  return param ? param.split(',').map(toNumber) : undefined;
}

function getCategories() {
  return categories.findCategories();
}

function getSections(req) {
  const forCategories = toNumberList(req.query.category);
  return sections.findSections(forCategories ? categories.findSectionIds(forCategories) : undefined);
}

function getIntents(req) {
  const forSections = toNumberList(req.query.section);
  if (forSections) {
    return intents.findIntents(sections.findIntentIds(forSections));
  }

  const forCategories = toNumberList(req.query.category);
  if (forCategories) {
    const sectionIds = categories.findSectionIds(forCategories);
    const intentIds = sections.findIntentIds(sectionIds);
    return intents.findIntents(intentIds);
  }

  return intents.findIntents();
}

function getStyles() {
  return styles.findStyles();
}

router
  .all('*', function (req, res, next) {
    console.log(req.method, req.url);
    next();
  })
  .get('/texts', function (req, res) {
    res.json(texts.find({
      text:       req.query.text,
      provider:   req.query.provider,
      impression: parseInt(req.query.impression, 10),
      category:   toNumberList(req.query.category),
      section:    toNumberList(req.query.section),
      intent:     toNumberList(req.query.intent),
      style:      toNumberList(req.query.style),
      seo:        req.query.seo ? req.query.seo === '1' : undefined,
      rank:       parseInt(req.query.rank, 10),
      limit:      parseInt(req.query.limit, 10),
      offset:     parseInt(req.query.offset, 10)
    }));
  })
  .get('/texts/:id', function (req, res) {
    res.json(texts.findById(toNumber(req.params.id)));
  })
  .get('/texts/:id/suggestions', function (req, res) {
    res.json(texts.findSuggestionsById(toNumber(req.params.id)));
  })
  .post('/texts', function (req, res) {
    res.json(texts.add(req.body));
  })
  .post('/texts/:id', function (req, res) {
    res.json(texts.update(toNumber(req.params.id), req.body));
  })
  .delete('/texts/:id', function (req, res) {
    res.json(texts.removeById(toNumber(req.params.id)));
  })
  .get('/tags', function (req, res) {
    res.json({
      categories: getCategories(req),
      sections: getSections(req),
      intents: getIntents(req),
      styles: getStyles(req)
    });
  })
  .get('/tags/categories', function (req, res) {
    res.json(getCategories(req));
  })
  .get('/tags/sections', function (req, res) {
    res.json(getSections(req));
  })
  .get('/tags/intents', function (req, res) {
    res.json(getIntents(req));
  })
  .get('/tags/styles', function (req, res) {
    res.json(getStyles(req));
  })
  .get('/assistant/sites', function (req, res) {
    res.json(assistant.findSites());
  })
  .get('/assistant/words', function (req, res) {
    res.json(assistant.findWords());
  });

module.exports = router;
