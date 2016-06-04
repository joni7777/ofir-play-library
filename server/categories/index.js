'use strict';

const lodash = require('lodash');

module.exports = function () {

  const DEFAULT_SECTIONS = [];

  const id = (function (start) {
    var __start = start;
    return function () {
      return __start++;
    };
  })(1);

  function assignIds(array) {
    return array.map(function (element) {
      return Object.assign({}, element, {
        id: id(),
        children: element.children.map(function (child) {
          return Object.assign({}, child, {id: id()});
        })
      });
    });
  }

  function assignDefaultSections(array) {
    return array.map(function (element) {
      return Object.assign({}, element, {
        sections: element.sections ? element.sections : DEFAULT_SECTIONS,
        children: element.children.map(function (child) {
          return Object.assign({}, child, {
            sections: child.sections ? child.sections : DEFAULT_SECTIONS,
          });
        })
      });
    });
  }

  function flatten(tree) {
    return lodash.flatten(tree.map(function (leaf) {
      return [leaf].concat(leaf.children);
    }));
  }

  const categories = assignDefaultSections(assignIds([
    {title: 'Accommodation', children: [
      {title: 'Hotels', sections: lodash.range(1, 11)},
      {title: 'Vacation Rentals'},
      {title: 'B&B'},
      {title: 'Camping & Hostels'},
      {title: 'Travel'},
      {title: 'Rio'}]},
    {title: 'Business', children: [
      {title: 'Consulting & Coaching'},
      {title: 'Services & Maintenance'},
      {title: 'Advertising & Marketing'},
      {title: 'Automotive & Cars'},
      {title: 'Real Estate'},
      {title: 'Finance & Law'},
      {title: 'Technology & Apps'},
      {title: 'Pets & Animals'}]},
    {title: 'Online Store', children: [
      {title: 'Clothing & Accessories'},
      {title: 'Health & Beauty'},
      {title: 'Home & Electronics'}]},
    {title: 'Photography', children: [
      {title: 'Events & Portraits'},
      {title: 'Commercial & Editorial'},
      {title: 'Travel & Documentary'}]},
    {title: 'Music', children: [
      {title: 'Solo Artist'},
      {title: 'Band'},
      {title: 'DJ'},
      {title: 'Music Industry'}]},
    {title: 'Design', children: [
      {title: 'Designer'},
      {title: 'Agency'},
      {title: 'Portfolio'}]},
    {title: 'Restaurants & Food', children: [
      {title: 'Restaurant'},
      {title: 'Cafe & Bakery'},
      {title: 'Bar & Club'},
      {title: 'Catering & Chef'},
      {title: 'Food & Drinks'}]},
    {title: 'Events', children: [
      {title: 'Weddings & Celebrations'},
      {title: 'Event Production'},
      {title: 'Performance & Shows'},
      {title: 'Parties & Festivals'}]},
    {title: 'Portfolio & CV', children: [
      {title: 'Portfolios'},
      {title: 'Resumes & CVs'},
      {title: 'Personal'}]},
    {title: 'Blog', children: []},
    {title: 'Health & Wellness', children: [
      {title: 'Health'},
      {title: 'Wellness'},
      {title: 'Sport & Recreation'}]},
    {title: 'Fashion & Beauty', children: [
      {title: 'Hair & Beauty'},
      {title: 'Fashion & Accessories'}]},
    {title: 'Community & Education', children: [
      {title: 'Community'},
      {title: 'Education'},
      {title: 'Religion & Non Profit'}]},
    {title: 'Creative Arts', children: [
      {title: 'Painters & Illustrators'},
      {title: 'Performing Arts'},
      {title: 'Writers'},
      {title: 'Entertainment'}]},
    {title: 'Landing Pages', children: [
      {title: 'Coming Soon'},
      {title: 'Launch'},
      {title: 'Campaign'}]}
  ]));

  return {
    findCategories: function () {
      return categories;
    },
    findSectionIds: function (categoryIds) {
      const sections = flatten(categories)
        .filter(function (category) {
          return lodash.contains(categoryIds, category.id);
        })
        .map(function (category) {
          return category.sections;
        });
      return lodash(sections).flatten().unique().value();
    }
  };

};
