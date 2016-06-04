'use strict';

let dbJsonFile = '';
process.argv.forEach(function (val) {
  if (val.indexOf('db=') === 0) {
    dbJsonFile = val.split('=')[1];
  }
});

const fs = require('fs');
if (!dbJsonFile) {
  dbJsonFile = '/tmp/TheLibrary.json';
  if (!fs.existsSync(dbJsonFile)) {
    console.log('Creating a new demo file!');
    fs.closeSync(fs.openSync(dbJsonFile, 'w'));
  }
}

let canSave = dbJsonFile.indexOf('.json') !== -1,
    canLoad = fs.existsSync(dbJsonFile);

console.log('DB file passed: ' + dbJsonFile);
console.log('Can save      : ' + canSave);
console.log('Can load      : ' + canLoad);

if (!canSave || !canLoad) {
  console.log('Cannot run, DB file not specified!');
  process.exit();
}

var lodash = require('lodash');
var loki = require('lokijs');
var db = new loki(dbJsonFile);

function preload(db) {
  console.log('Preloading the default texts...');
  var texts = db.addCollection('texts', ['id']);
  texts.insert({
    id:         1,
    categories: [2],
    sections:   [1],
    intents:    lodash.range(1, 53),
    styles:     lodash.range(1, 6),
    views:       0,
    rank:        0,
    impression:  0,
    provider:    'wix',
    seo:         true,
    text:        'Welcome to Rio',
    html:        '<span suggest-id="1">Welcome</span> to <span suggest-id="2">Rio</span>',
    suggestions: {
      '1': ['Come'],
      '2': ['Heaven', 'Paradise', 'Avishai\'s Awesome We Want to Win Hotel', 'a Higher Place']
    }
  });
  texts.insert({
    id:         2,
    categories: [2],
    sections:   [2],
    intents:    lodash.range(1, 53),
    styles:     lodash.range(1, 6),
    views:       0,
    rank:        0,
    impression:  0,
    provider:    'wix',
    seo:         true,
    text:        'A Home in the Heart of the City',
    html:        '<span suggest-id="1">A</span> <span suggest-id="2">Home</span> In the <span suggest-id="3">Heart</span> of the <span suggest-id="4">City</span>',
    suggestions: {
      '1': ['Your'],
      '2': ['Place', 'Corner', 'Palace', 'Spot'],
      '3': ['Center', 'Middle', 'Bustle'],
      '4': ['Island', 'Villiage', 'Nightlife', 'Suburbs', 'Jungle']
    }
  });
  texts.insert({
    id:         3,
    categories: [2],
    sections:   [3],
    intents:    lodash.range(1, 53),
    styles:     lodash.range(1, 6),
    views:       0,
    rank:        0,
    impression:  0,
    provider:    'wix',
    seo:         true,
    text:        'Stay in a beautiful highrise in lpanema just off the beach close to many world-class cafes and restaurants',
    html:        '<span suggest-id="1">Stay</span> <span suggest-id="2">in a beautiful</span> <span suggest-id="3">highrise</span> in <span suggest-id="4">lpanema</span> just off the <span suggest-id="5">beach</span> close to <span suggest-id="6">many</span> <span suggest-id="7">world-class</span> <span suggest-id="8">cafes</span> and <span suggest-id="9">restaurants</span>',
    suggestions: {
      '1': ['Relax', 'Have Fun'],
      '2': ['an amazing', 'a wonderfull', 'a luxury'],
      '3': ['place', 'hotel', 'suite', 'studio'],
      '4': [],
      '5': ['expressway', 'river', 'beaten path'],
      '6': ['the best', 'a lot of', 'a ton of'],
      '7': ['highly recommended', 'top-notch', 'superior', 'fancy'],
      '8': ['clubs', 'museums', 'activities'],
      '9': ['beaches', 'nightlife', 'parks']
    }
  });
  texts.insert({
    id:         4,
    categories: [2],
    sections:   [5],
    intents:    lodash.range(1, 53),
    styles:     lodash.range(1, 6),
    views:       0,
    rank:        0,
    impression:  0,
    provider:    'wix',
    seo:         true,
    text:        'Our Apartment',
    html:        '<span suggest-id="1">Our</span> <span suggest-id="2">Apartment</span>',
    suggestions: {
      '1': ['The', 'My'],
      '2': ['Place', 'Hotel', 'Room', 'Villa', 'Home', 'Hostel']
    }
  });
  texts.insert({
    id:         5,
    categories: [2],
    sections:   [6],
    intents:    lodash.range(1, 53),
    styles:     lodash.range(1, 6),
    views:       0,
    rank:        0,
    impression:  0,
    provider:    'wix',
    seo:         true,
    text:        'See What\'s Inside',
    html:        'See <span suggest-id="1">What\'s</span> Inside',
    suggestions: {
      '1': ['View', 'Look']
    }
  });
  texts.insert({
    id:         6,
    categories: [2],
    sections:   [8],
    intents:    lodash.range(1, 53),
    styles:     lodash.range(1, 6),
    views:       0,
    rank:        0,
    impression:  0,
    provider:    'wix',
    seo:         true,
    text:        'Hi my name is Camilia and I\'m a nutrionist from the south of Brazil ' +
                 'I moved to the beautiful lpanema neighborhood two years ago with my husband Tiago. ' +
                 'We live in a homie highrise just off the Lebion Beach, but in the summer we travel!',
    html:        '<span suggest-id="1">Hi</span> my name is <span suggest-id="2">Camilia</span> and I\'m a <span suggest-id="3">nutrionist</span> from the <span suggest-id="4">south</span> of <span suggest-id="5">Brazil.</span> ' +
                 'I <span suggest-id="1-1">moved</span> to the <span suggest-id="1-2">beautiful</span> <span suggest-id="1-3">lpanema</span> <span suggest-id="1-4">neighborhood</span> <span suggest-id="1-5">two</span> <span suggest-id="1-6">years</span> ago with my <span suggest-id="1-7">husband</span> <span suggest-id="1-8">Tiago.</span> ' +
                 'We live in a homie <span suggest-id="2-1">highrise</span> just off the <span suggest-id="2-2">Lebion</span> <span suggest-id="2-3">Beach,</span> but in the <span suggest-id="2-4">summer</span> we <span suggest-id="2-5">travel!</span>',
    suggestions: {
      '1': ['Hey there', 'Howdy', 'Hello', 'Halo!', 'Bonjour'],
      '2': [],
      '3': ['lawyer', 'hotel owner', 'doctor', 'free spirit'],
      '4': ['norht', 'east', 'west', 'the good side'],
      '5': [],

      '1-1': ['came'],
      '1-2': ['gorgeous', 'amazing', 'stunning'],
      '1-3': [],
      '1-4': ['block', 'city', 'area'],
      '1-5': [],
      '1-6': ['months', 'decades', 'days', 'weeks', 'hours'],
      '1-7': ['dog', 'cat', 'wife', 'significant other', 'family', 'imagination'],
      '1-8': [],

      '2-1': ['apartment', 'home', 'bungalow', 'hut'],
      '2-2': [],
      '2-3': [],
      '2-4': ['winter', 'spring', 'fall'],
      '2-5': ['stay in', 'host guests', 'go camping']
    }
  });

  texts.insert({
    id: 9,
    categories: [2], sections: [1], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Welcome to Rio',
    html: 'Welcome to Rio',
    suggestions: {}
  });
  texts.insert({
    id: 10,
    categories: [2], sections: [1], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Rethink Luxurious Comfort',
    html: 'Rethink Luxurious Comfort',
    suggestions: {}
  });
  texts.insert({
    id: 11,
    categories: [2], sections: [1], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'The Boutique Hotel of Alabama',
    html: 'The Boutique Hotel of Alabama',
    suggestions: {}
  });
  texts.insert({
    id: 12,
    categories: [2], sections: [1], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Looking for a Different Hotel Experience?',
    html: 'Looking for a Different Hotel Experience?',
    suggestions: {}
  });
  texts.insert({
    id: 13,
    categories: [2], sections: [1], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Giora Kaplan\'s Hotel & Apartments',
    html: 'Giora Kaplan\'s Hotel & Apartments',
    suggestions: {}
  });
  texts.insert({
    id: 14,
    categories: [2], sections: [1], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Relaxation with a Pinch of Tradition',
    html: 'Relaxation with a Pinch of Tradition',
    suggestions: {}
  });
  texts.insert({
    id: 15,
    categories: [2], sections: [1], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Reinvigorate Your Senses',
    html: 'Reinvigorate Your Senses',
    suggestions: {}
  });
  texts.insert({
    id: 16,
    categories: [2], sections: [2], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'A Home in the Heart of the City',
    html: 'A Home in the Heart of the City',
    suggestions: {}
  });
  texts.insert({
    id: 17,
    categories: [2], sections: [2], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Challenging the Average Since 1990',
    html: 'Challenging the Average Since 1990',
    suggestions: {}
  });
  texts.insert({
    id: 18,
    categories: [2], sections: [2], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'We Believe in Relaxation',
    html: 'We Believe in Relaxation',
    suggestions: {}
  });
  texts.insert({
    id: 19,
    categories: [2], sections: [2], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'A Brand New Hotel Beyond Ordinary',
    html: 'A Brand New Hotel Beyond Ordinary',
    suggestions: {}
  });
  texts.insert({
    id: 20,
    categories: [2], sections: [2], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'The Perfect Mix of Old & New',
    html: 'The Perfect Mix of Old & New',
    suggestions: {}
  });
  texts.insert({
    id: 21,
    categories: [2], sections: [2], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Take Some Time To Relax and Re-Charge',
    html: 'Take Some Time To Relax and Re-Charge',
    suggestions: {}
  });
  texts.insert({
    id: 22,
    categories: [2], sections: [2], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Enjoy the View from Our Delightful Conservatory',
    html: 'Enjoy the View from Our Delightful Conservatory',
    suggestions: {}
  });
  texts.insert({
    id: 23,
    categories: [2], sections: [2], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Enjoy Our Indoor Heated Pool and Nordic Sauna',
    html: 'Enjoy Our Indoor Heated Pool and Nordic Sauna',
    suggestions: {}
  });
  texts.insert({
    id: 24,
    categories: [2], sections: [2], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Recharge Ready for Another Day Exploring the City',
    html: 'Recharge Ready for Another Day Exploring the City',
    suggestions: {}
  });
  texts.insert({
    id: 25,
    categories: [2], sections: [2], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Visit Our Restaurant or Relax in Our Comfy Lounge',
    html: 'Visit Our Restaurant or Relax in Our Comfy Lounge',
    suggestions: {}
  });
  texts.insert({
    id: 26,
    categories: [2], sections: [3], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Somewhere you can come to enjoy stunning food with Mediterranean influences, great service and if you have time, a dip in our luxurious hot springs.',
    html: 'Somewhere you can come to enjoy stunning food with Mediterranean influences, great service and if you have time, a dip in our luxurious hot springs.',
    suggestions: {}
  });
  texts.insert({
    id: 27,
    categories: [2], sections: [3], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Whether you’re enjoying a long, relaxing break or just staying overnight, unwind in comfortable, well appointed rooms with great amenities.',
    html: 'Whether you’re enjoying a long, relaxing break or just staying overnight, unwind in comfortable, well appointed rooms with great amenities.',
    suggestions: {}
  });
  texts.insert({
    id: 28,
    categories: [2], sections: [3], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'The Grand Sal Hotel is situated close to Krakow, but far away from the hustle and bustle of the city, within the picturesque landscape of St. Kinga park. Welcome to our unique hotel, one of its kind in the world.',
    html: 'The Grand Sal Hotel is situated close to Krakow, but far away from the hustle and bustle of the city, within the picturesque landscape of St. Kinga park. Welcome to our unique hotel, one of its kind in the world.',
    suggestions: {}
  });
  texts.insert({
    id: 29,
    categories: [2], sections: [3], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'In Rasen-Antholz, one of South Tyrol’s natural treasures, you can enjoy unforgettable and exciting holiday at Hotel Koflerhof.',
    html: 'In Rasen-Antholz, one of South Tyrol’s natural treasures, you can enjoy unforgettable and exciting holiday at Hotel Koflerhof.',
    suggestions: {}
  });
  texts.insert({
    id: 30,
    categories: [2], sections: [3], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Standing on the beach as the sun sinks over the horizon, the water turning a deep purple while the light crawls unhurriedly forward, that\'s when time stops. That is the Vesper moment you\'ll never forget.',
    html: 'Standing on the beach as the sun sinks over the horizon, the water turning a deep purple while the light crawls unhurriedly forward, that\'s when time stops. That is the Vesper moment you\'ll never forget.',
    suggestions: {}
  });
  texts.insert({
    id: 31,
    categories: [2], sections: [5], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'About the Place',
    html: 'About the Place',
    suggestions: {}
  });
  texts.insert({
    id: 32,
    categories: [2], sections: [5], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'The Suite',
    html: 'The Suite',
    suggestions: {}
  });
  texts.insert({
    id: 33,
    categories: [2], sections: [5], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'What You Get',
    html: 'What You Get',
    suggestions: {}
  });
  texts.insert({
    id: 34,
    categories: [2], sections: [5], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Meet Villalama',
    html: 'Meet Villalama',
    suggestions: {}
  });
  texts.insert({
    id: 35,
    categories: [2], sections: [6], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Check it Out',
    html: 'Check it Out',
    suggestions: {}
  });
  texts.insert({
    id: 36,
    categories: [2], sections: [6], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Get More Info',
    html: 'Get More Info',
    suggestions: {}
  });
  texts.insert({
    id: 37,
    categories: [2], sections: [6], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'See More',
    html: 'See More',
    suggestions: {}
  });
  texts.insert({
    id: 38,
    categories: [2], sections: [6], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'See The Room',
    html: 'See The Room',
    suggestions: {}
  });
  texts.insert({
    id: 39,
    categories: [2], sections: [6], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'View Offer',
    html: 'View Offer',
    suggestions: {}
  });
  texts.insert({
    id: 40,
    categories: [2], sections: [8], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Young at heart, we are motivated, energetic individuals, encouraged to express our personalities at work. The Mediterranean’s relaxed, fun and upbeat atmosphere allows us to deliver service with a flair. We hope you love Burley Manor just as much as we do!',
    html: 'Young at heart, we are motivated, energetic individuals, encouraged to express our personalities at work. The Mediterranean’s relaxed, fun and upbeat atmosphere allows us to deliver service with a flair. We hope you love Burley Manor just as much as we do!',
    suggestions: {}
  });
  texts.insert({
    id: 41,
    categories: [2], sections: [8], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Here at New Forest Hotels we welcome both families and dogs, ensuring no one gets left behind! With rooms designed with comfort in mind, you’ll be sure to find a room type to suit your needs. With leisure facilities and award winning restaurants, our hotels combine relaxation and exploration of the Forest to ensure our guests enjoy their stay!',
    html: 'Here at New Forest Hotels we welcome both families and dogs, ensuring no one gets left behind! With rooms designed with comfort in mind, you’ll be sure to find a room type to suit your needs. With leisure facilities and award winning restaurants, our hotels combine relaxation and exploration of the Forest to ensure our guests enjoy their stay!',
    suggestions: {}
  });
  texts.insert({
    id: 42,
    categories: [2], sections: [8], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'We are extremely committed as a group to sourcing high quality, fresh, local produce to create our award winning dishes that are enjoyed by so many of our guests. Our rooms are designed to accommodate families, couples and the business traveller, providing comfort for all during their stay.',
    html: 'We are extremely committed as a group to sourcing high quality, fresh, local produce to create our award winning dishes that are enjoyed by so many of our guests. Our rooms are designed to accommodate families, couples and the business traveller, providing comfort for all during their stay.',
    suggestions: {}
  });
  texts.insert({
    id: 43,
    categories: [2], sections: [8], intents: lodash.range(1, 53), styles: lodash.range(1, 6), views: 0, rank: 0, impression: 0, provider: 'wix', seo: true,
    text: 'Vesper is packing up and wandering off the beaten path, because Vesper is freedom. It\'s pleasure. It\'s taking a step back from responsibility, taking a break from the grind, finding a retreat that inspires the senses.',
    html: 'Vesper is packing up and wandering off the beaten path, because Vesper is freedom. It\'s pleasure. It\'s taking a step back from responsibility, taking a break from the grind, finding a retreat that inspires the senses.',
    suggestions: {}
  });

  db.saveDatabase();
}

db.loadDatabase({}, function () {
  console.log('Database loaded');
  if (!db.getCollection('texts')) {
    preload(db);
  }
});

module.exports = db;
