/**
 * Created by rg12 on 02/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('blocks.filter')
    .filter('dateParse', dateParse);


  function dateParse() {
    return function (date) {
      return new Date(date);
    };
  }
})();
