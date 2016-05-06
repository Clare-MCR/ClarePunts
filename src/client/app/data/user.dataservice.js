(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('UserServices', UserServices);

  UserServices.$inject = ['$resource'];

  /* @ngInject */
  function UserServices($resource) {
    return $resource('http://rjg70.user.srcf.net/rest/user/:Id/:Type', null, {
      update: {method: 'PUT'}
    });
  }

})();
