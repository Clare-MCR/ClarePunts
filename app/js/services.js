'use strict';

/* Services */

var puntsServices = angular.module('puntsServices', ['ngResource']);

puntsServices.factory('Punts', ['$resource',
  function($resource){
    return $resource('rest/punts/:puntsId', {}, {
      query: {method: 'GET', isArray: true}
    });
  }]);

puntsServices.factory('Users', ['$resource',
  function($resource){
    return $resource('rest/users/:userId', {}, {
      query: {method: 'GET', isArray: false}
    });
  }]);
