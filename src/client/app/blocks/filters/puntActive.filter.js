/**
 * Created by rg12 on 02/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('blocks.filter')
    .filter('puntActive', puntActive);

  function puntActive() {
    /*jshint camelcase: false */
    return function (input, dt) {
      var date = new Date(dt);
      input = input.filter(function (punt) {
        return date >= new Date(punt.availableFrom) && date < new Date(punt.availableTo);
      });
      return input;
    };
  }
})();
