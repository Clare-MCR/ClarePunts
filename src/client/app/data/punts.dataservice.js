(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('puntsServices', puntsServices);

  puntsServices.$inject = ['$resource'];

  /* @ngInject */
  function puntsServices($resource) {
    return $resource('http://rjg70.user.srcf.net/rest/punts/:puntsId', null, {
      'get': {method: 'GET', isArray: true},
      update: {method: 'PUT'}
    });
  }

})();

