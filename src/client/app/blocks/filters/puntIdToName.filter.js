/**
 * Created by rg12 on 02/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('blocks.filter')
    .filter('puntidToName', puntidToName);

  function puntidToName() {
    return function (puntid, punts) {
      for (var i = 0; i < punts.length; i++) {
        if (punts[i].id === puntid) {
          return punts[i].name;
        }
      }
      return false;
    };
  }
})();
