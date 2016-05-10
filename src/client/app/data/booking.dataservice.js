(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('BookingServices', BookingServices);

  BookingServices.$inject = ['$resource'];

  /* @ngInject */
  function BookingServices($resource) {
    // return $resource('http://rjg70.user.srcf.net/rest/booking/:Id/:from/:to',
    var date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    var unixtime = Math.floor(date.getTime() / 1000);
    return $resource('rest/booking/:Id/:from/:to',
      {Id: '*', from: unixtime, to: null});
  }

})();
