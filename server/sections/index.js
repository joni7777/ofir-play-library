'use strict';

const lodash = require('lodash');

module.exports = function () {

  const sections = [
    {id:  1, title: 'Home - Main Title',  intents: [48, 19, 46, 32, 5, 37]},
    {id:  2, title: 'Home - Page Title',  intents: [15, 50, 51, 2, 42, 13, 14, 11]},
    {id:  3, title: 'Home - Description', intents: [16, 50, 51, 2, 42, 13, 14, 11]},
    {id:  4, title: 'The Place',          intents: [24, 33, 17, 43, 27, 7, 38, 39, 41, 40]},
    {id:  5, title: 'The Place - Title',  intents: [24, 33, 17, 43, 27, 7, 38, 39, 41, 40]},
    {id:  6, title: 'The Place - CTA',    intents: [24, 33, 17, 43, 27, 7, 38, 39, 41, 40]},
    {id:  7, title: 'The Location',       intents: [21, 28, 49, 23, 10, 13, 12, 11]},
    {id:  8, title: 'About Us',           intents: [20, 52, 44, 45, 25, 29, 35, 31, 30]},
    {id:  9, title: 'Contact Us',         intents: [6, 1, 9, 18, 34, 4, 3]},
    {id: 10, title: 'Follow Us',          intents: [5, 26, 47, 36, 22, 8]}
  ];

  return {
    findSections: function (ids) {
      if (ids) {
        return sections.filter(function (section) {
          return lodash.contains(ids, section.id);
        });
      }
      return sections;
    },
    findIntentIds: function (sectionIds) {
      const intents = sections
        .filter(function (section) {
          return lodash.contains(sectionIds, section.id);
        })
        .map(function (section) {
          return section.intents;
        });
      return lodash(intents).flatten().unique().value();
    }
  };

};
