(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('cachedResource', cachedResource);

  cachedResource.$inject = ['$resource', '$cacheFactory'];

  /* @ngInject */
  function cachedResource($resource, $cacheFactory) {
    var cache = $cacheFactory('resourceCache');

    var interceptor = {
      response: function (response) {
        // cache.remove(response.config.url); @todo fix to only delete relevant caches
        cache.removeAll();
        console.log(response.status);
        console.log('cache removed', response.config.url);
        return response;
      }
    };

    return function (url, paramDefaults, actions, options) {
      actions = angular.extend({}, actions, {
        'get': {method: 'GET', cache: cache},
        'query': {method: 'GET', cache: cache, isArray: true},
        'save': {method: 'POST', interceptor: interceptor},
        'remove': {method: 'DELETE', interceptor: interceptor},
        'delete': {method: 'DELETE', interceptor: interceptor},
        'update': {method: 'PUT', interceptor: interceptor}
      });

      return $resource(url, paramDefaults, actions, options);
    };
  }
})();
