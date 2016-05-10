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
        console.log({puntid: [puntid, typeof(puntid)], punt: [punts[i].id, typeof(punts[i].id)]});
        if (punts[i].id === puntid) {
          return punts[i].name;
        }
      }
      return false;
    };
  }
})();
