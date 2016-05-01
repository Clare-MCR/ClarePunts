/**
 * Created by rg12 on 28/04/2016.
 */
angular.module('puntsApp.admin.bookings', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin/bookings', {
            templateUrl: 'admin/booking/adminbooking.html',
            controller: 'AdminBookings'
        });
    }])

    .controller('AdminBookings', ['$scope', function ($scope) {

    }]);