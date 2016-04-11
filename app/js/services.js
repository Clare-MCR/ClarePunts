'use strict';

/* Services */

var puntsServices = angular.module('puntsServices', ['ngResource']);

puntsServices.factory('Punts', ['$resource',
  function($resource){
    return $resource('rest/punts/:puntsId', {}, {
      query: {method:'GET', params:{puntId:'punt'}, isArray:true}
    });
  }]);

puntsServices.factory('Users', ['$resource',
  function($resource){
    return $resource('rest/users/:userId', {}, {
      query: {method:'GET', params:{userId:'user'}, isArray:true}
    });
  }]);
