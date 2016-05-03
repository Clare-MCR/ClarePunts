(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('userServices', userServices);

  userServices.$inject = ['$resource'];

  /* @ngInject */
  function userServices($resource) {
    return $resource('http://rjg70.user.srcf.net/rest/user/:Id', null, {
      update: {method: 'PUT'}
    });
  }

})();
