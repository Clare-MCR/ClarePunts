(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('purgeUserServices', purgeUserServices);

  purgeUserServices.$inject = ['$resource'];

  /* @ngInject */
  function purgeUserServices($resource) {
    return $resource('http://rjg70.user.srcf.net/rest/user/type/:type', null, {
      update: {method: 'PUT'}
    });
  }

})();
