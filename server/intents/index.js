'use strict';

const lodash = require('lodash');

module.exports = function () {

  const intents = [
    {id:  1, title: 'Ask Anything'},
    {id:  2, title: 'Best Vacation'},
    {id:  3, title: 'Both'},
    {id:  4, title: 'Call'},
    {id:  5, title: 'Don\'t Miss'},
    {id:  6, title: 'Feel Free'},
    {id:  7, title: 'Feel Like Home'},
    {id:  8, title: 'Follow us'},
    {id:  9, title: 'For Any Issue'},
    {id: 10, title: 'For Backpackers'},
    {id: 11, title: 'For Businesess'},
    {id: 12, title: 'For Couples'},
    {id: 13, title: 'For Families'},
    {id: 14, title: 'For Individuals'},
    {id: 15, title: 'Great Location'},
    {id: 16, title: 'Great Place'},
    {id: 17, title: 'Great Price'},
    {id: 18, title: 'Here Always'},
    {id: 19, title: 'Hi'},
    {id: 20, title: 'Introduction'},
    {id: 21, title: 'In the Middle of...'},
    {id: 22, title: 'It\'s Interesting'},
    {id: 23, title: 'Just Off the Beach'},
    {id: 24, title: 'Just The Place'},
    {id: 25, title: 'Just Us / Me'},
    {id: 26, title: 'Keep in Touch'},
    {id: 27, title: 'Luxury'},
    {id: 28, title: 'Near to...'},
    {id: 29, title: 'Passionate'},
    {id: 30, title: 'Personal Touch'},
    {id: 31, title: 'Professionals'},
    {id: 32, title: 'Sale'},
    {id: 33, title: 'See More'},
    {id: 34, title: 'Send Email'},
    {id: 35, title: 'Since...'},
    {id: 36, title: 'Stay Updated'},
    {id: 37, title: 'Take a Tour'},
    {id: 38, title: 'The Hotel'},
    {id: 39, title: 'The Lounge'},
    {id: 40, title: 'The Pool'},
    {id: 41, title: 'The Room'},
    {id: 42, title: 'Time to Relax'},
    {id: 43, title: 'Unique'},
    {id: 44, title: 'We Are a Corporation'},
    {id: 45, title: 'We Are small Business'},
    {id: 46, title: 'We Are...'},
    {id: 47, title: 'We Let You Know'},
    {id: 48, title: 'Welcome'},
    {id: 49, title: 'What Around Here'},
    {id: 50, title: 'What We Offer'},
    {id: 51, title: 'What You Get'},
    {id: 52, title: 'Who Are We'}
  ];

  return {
    findIntents: function (ids) {
      if (ids) {
        return intents.filter(function (intent) {
          return lodash.contains(ids, intent.id);
        });
      }
      return intents;
    }
  };

};
