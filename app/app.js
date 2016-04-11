'use strict';

/* App Module */

var phonecatApp = angular.module('puntsApp', [
  'ngRoute',
  'puntsAnimations',

  'puntsControllers',
  'puntsFilters',
  'puntsServices',
  
  'puntsApp.version'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/status', {
        templateUrl: 'templates/phone-list.html',
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
