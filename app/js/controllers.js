'use strict';

/* Controllers */

var puntsControllers = angular.module('puntsControllers', []);

phonecatControllers.controller('PuntsStatus', ['$scope', 'Punts',
  function($scope, Punts, Users) {
    $scope.punts = Punts.query();
    $scope.user = Users.query();
    console.log($scope.user);
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);
