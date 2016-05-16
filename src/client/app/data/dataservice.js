(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('DataServices', DataServices);

  DataServices.$inject = ['cachedResource'];

  /* @ngInject */
  function DataServices(cachedResource) {
    var date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    var unixtime = Math.floor(date.getTime() / 1000);

    return cachedResource('rest/:action/:Id/:param1/:param2', null, {
      getUser: {method: 'GET', params: {action: 'user'}, isArray: false},
      getUsers: {method: 'GET', params: {action: 'user'}, isArray: true},
      getBookings: {method: 'GET', params: {action: 'booking', Id: '*', param1: unixtime}, isArray: true},
      getPunts: {method: 'GET', params: {action: 'punts'}, isArray: true},
      getSettings: {method: 'GET', params: {action: 'settings', Id: 'rules'}, isArray: false}
    });
  }

})();
