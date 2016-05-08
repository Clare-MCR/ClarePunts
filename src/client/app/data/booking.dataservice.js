(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('BookingServices', BookingServices);

  BookingServices.$inject = ['$resource'];

  /* @ngInject */
  function BookingServices($resource) {
    // return $resource('http://rjg70.user.srcf.net/rest/booking/:Id/:from/:to',
    return $resource('rest/booking/:Id/:from/:to',
      {Id: '*', from: new Date().getTime() / 1000},
      {
        'get': {method: 'GET', isArray: true}
      });
  }

})();
