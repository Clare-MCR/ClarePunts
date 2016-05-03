(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('bookingServices', bookingServices);

  bookingServices.$inject = ['$resource'];

  /* @ngInject */
  function bookingServices($resource) {
    return $resource('http://rjg70.user.srcf.net/rest/booking/:Id/:from/:to', null, {
      'get': {method: 'GET', isArray: true}
    });
  }

})();
