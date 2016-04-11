'use strict';

/* Controllers */

var puntsControllers = angular.module('puntsControllers', []);

puntsControllers.controller('PuntsStatus', ['$scope', '$filter', 'Punts', 'Users', 'Bookings',
    function ($scope, $filter, Punts, Users, Bookings) {
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();
        
        $scope.user = Users.query();
        //$scope.punts = Punts.query({}, function (punts) {
        // for(var i=0; i<punts.length;i++){
        // punts.active = $filter()
        // }
        // });
        $scope.punts = [
            {
                "id": "1",
                "name": "Silence of the Cam",
                "available_from": "2015-11-06 00:00:00",
                "available_to": "2015-11-14 00:00:00"
            },
            {
                "id": "2",
                "name": "MCArk",
                "available_from": "2015-11-06 00:00:00",
                "available_to": "2015-11-14 00:00:00"
            },
            {
                "id": "3",
                "name": "Clare De lune",
                "available_from": "2015-11-06 00:00:00",
                "available_to": "2015-11-14 00:00:00"
            },
            {
                "id": "4",
                "name": "clarebuoyant",
                "available_from": "2015-11-06 00:00:00",
                "available_to": "2015-11-14 00:00:00"
            }];
        for (var i = 0; i < $scope.punts.length; i++) {
            $scope.punts[i].active = $filter('puntActive')($scope.punts[i]);
        }
        //$scope.bookings = Bookings.query();
        $scope.bookings = [
            {
                "id": "713877",
                "puntid": "2",
                "user_type": "MCR",
                "booker": "wmw25",
                "name": "W.M. Wynell-Mayow",
                "mobile": "07838438883",
                "time_from": "2014-06-27 20:00:00",
                "time_to": "2014-06-27 23:00:00"
            },
            {
                "id": "714222",
                "puntid": "2",
                "user_type": "MCR",
                "booker": "tb405",
                "name": "Jac Davis",
                "mobile": "07949180438",
                "time_from": "2015-04-11 09:00:00",
                "time_to": "2015-04-11 17:00:00"
            },
            {
                "id": "714103",
                "puntid": "1",
                "user_type": "MCR",
                "booker": "sml58",
                "name": "S.M. Lowe",
                "mobile": "07432719973",
                "time_from": "2014-08-18 13:00:00",
                "time_to": "2014-08-18 15:00:00"
            }
        ];
  }]);

puntsControllers.controller('PuntsBook', ['$scope', 'Punts', 'Users', 'Bookings',
    function ($scope, Punts, Users, Bookings) {
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        $scope.user = Users.query({}, function (user) {
            $scope.submission.name = user.name;
            $scope.submission.booker = user.crsid;
            $scope.submission.phone = user.phone;
        });

        //$scope.punts = Punts.query({}, function (punts) {
        // for(var i=0; i<punts.length;i++){
        // punts.active = $filter()
        // }
        // });
        $scope.punts = [
            {
                "id": "1",
                "name": "Silence of the Cam",
                "available_from": "2015-11-06 00:00:00",
                "available_to": "2015-11-14 00:00:00"
            },
            {
                "id": "2",
                "name": "MCArk",
                "available_from": "2015-11-06 00:00:00",
                "available_to": "2015-11-14 00:00:00"
            },
            {
                "id": "3",
                "name": "Clare De lune",
                "available_from": "2015-11-06 00:00:00",
                "available_to": "2015-11-14 00:00:00"
            },
            {
                "id": "4",
                "name": "clarebuoyant",
                "available_from": "2015-11-06 00:00:00",
                "available_to": "2015-11-14 00:00:00"
            }];

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };
  }]);
