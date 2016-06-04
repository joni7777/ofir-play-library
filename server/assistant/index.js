'use strict';

const lodash = require('lodash');

module.exports = function () {

  const sites = [
    {id: 1, title: 'Booking.com'},
    {id: 2, title: 'Hotels.com'},
    {id: 3, title: 'Tripadvisor.com'},
    {id: 4, title: 'Airbnb.com'},
    {id: 5, title: 'Agoda.com'}
  ];

  const candidates = ['amsterdam', 'rentals', 'hotel', 'discount', 'travel', 'airbnb', 'voyages', 'flights', 'travel',
                     'general', 'vacation', 'tickets', 'reservations', 'cities', 'marriott', 'travel', 'deals', 'vag',
                     'london', 'hotels', 'rent', 'sec', 'price', 'comparison', 'travel', 'planning', 'hotwire'];

  const words = candidates
    .map(function (word, id) {
      return {
        id: id,
        title: word,
        rank: lodash.random(5)
      };
    });

  return {
    findWords: function () {
      return lodash(words).sample(15).value();
    },
    findSites: function () {
      return sites;
    }
  };

};
