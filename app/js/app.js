'use strict';

/* App Module */

var puntsApp = angular.module('puntsApp', [
  'ngRoute',
  //'puntsAnimations',

  'puntsControllers',
  'puntsFilters',
  'puntsServices',
  
  'puntsApp.version'
]);

puntsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/status', {
        templateUrl: 'templates/status.html',
        controller: 'PuntsStatus'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'templates/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/status'
      });
  }]);
