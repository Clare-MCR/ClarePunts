(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('SettingsServices', SettingsServices);

  SettingsServices.$inject = ['cachedResource'];

  /* @ngInject */
  function SettingsServices(cachedResource) {
    // return $resource('http://rjg70.user.srcf.net/rest/settings/:Type', {Type: 'rules'}, {
    return cachedResource('rest/settings/:Type', {Type: 'rules'}, {});
  }

})();
