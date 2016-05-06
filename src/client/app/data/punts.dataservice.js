(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('PuntsServices', PuntsServices);

  PuntsServices.$inject = ['$resource'];

  /* @ngInject */
  function PuntsServices($resource) {
    return $resource('http://rjg70.user.srcf.net/rest/punts/:puntsId', null, {
      'get': {method: 'GET', isArray: true},
      update: {method: 'PUT'}
    });
  }

})();

