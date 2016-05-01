/**
 * Created by rg12 on 28/04/2016.
 */
angular.module('puntsApp.bookings', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mybookings', {
            templateUrl: 'mybookings/mybookings.html',
            controller: 'PuntsBookings'
        });
    }])

    .controller('PuntsBookings', ['$scope', function ($scope) {
        $scope.form = [];
        $scope.deleteBooking = function () {

        };
    }]);