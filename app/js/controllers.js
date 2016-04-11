'use strict';

/* Controllers */

var puntsControllers = angular.module('puntsControllers', []);

puntsControllers.controller('PuntsStatus', ['$scope', 'Punts', 'Users', 'Bookings',
    function ($scope, Punts, Users, Bookings) {
        $scope.user = Users.query();
        $scope.punts = Punts.query({}, function (punts) {
            for (var i = 0; i < punts.length; i++) {
          
            }
        });
        $scope.bookings = Bookings.query();
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
