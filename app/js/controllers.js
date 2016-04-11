'use strict';

/* Controllers */

var puntsControllers = angular.module('puntsControllers', []);

puntsControllers.controller('PuntsStatus', ['$scope', 'Punts', 'Users',
  function($scope, Punts, Users) {
    $scope.punts = Punts.query();
    $scope.user = Users.query();
  }]);

puntsControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);
