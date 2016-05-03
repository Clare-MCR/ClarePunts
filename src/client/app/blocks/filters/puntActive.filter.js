/**
 * Created by rg12 on 02/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('blocks.filter')
    .filter('puntActive', puntActive);


  function puntActive() {
    return function (input, dt) {
      var date = new Date(dt);
      input = input.filter(function (punt) {
        return date >= new Date(punt.available_from) && date < new Date(punt.available_to);
      });
      return input;
    };
  }
})();
