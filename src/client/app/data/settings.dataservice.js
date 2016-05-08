(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('SettingsServices', SettingsServices);

  SettingsServices.$inject = ['$resource'];

  /* @ngInject */
  function SettingsServices($resource) {
    // return $resource('http://rjg70.user.srcf.net/rest/settings/:Type', {Type: 'rules'}, {
    return $resource('rest/settings/:Type', {Type: 'rules'}, {
      update: {method: 'PUT'}
    });
  }

})();
