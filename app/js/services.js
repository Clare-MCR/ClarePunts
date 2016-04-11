'use strict';

/* Services */

var puntsServices = angular.module('puntsServices', ['ngResource']);

phonecatServices.factory('Punts', ['$resource',
  function($resource){
    return $resource('punts/:puntsId', {}, {
      query: {method:'GET', params:{puntId:'punt'}, isArray:true}
    });
  }]);
