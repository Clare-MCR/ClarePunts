(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('PuntsServices', PuntsServices);

  PuntsServices.$inject = ['cachedResource'];

  /* @ngInject */
  function PuntsServices(cachedResource) {
    return cachedResource('rest/punts/:puntsId', null, {});
  }

})();

