/**
 * Created by rg12 on 02/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('blocks.filter')
    .filter('checkmark', checkmark);

  function checkmark() {
    return function (input) {
      return input === '1' ? '\u2713' : '\u2718';
    };
  }
})();
