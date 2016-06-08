(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('DateServices', DateServices);

  DateServices.$inject = ['$resource'];

  /* @ngInject */
  function DateServices($resource) {
    return $resource('rest/date');
  }

})();
