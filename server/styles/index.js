'use strict';

module.exports = function () {

  const styles = [
    {id: 1, title: 'Serious'},
    {id: 2, title: 'Impressive'},
    {id: 3, title: 'Simple'},
    {id: 4, title: 'Friendly'},
    {id: 5, title: 'Funny'}
  ];

  return {
    findStyles: function () {
      return styles;
    }
  };

};
