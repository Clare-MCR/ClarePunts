'use strict';

// Declare app level module which depends on views, and components
angular.module('puntsApp', [
  'ngRoute',
  'puntsApp.view1',
  'puntsApp.view2',
  'puntsApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
