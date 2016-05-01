/**
 * Created by rg12 on 28/04/2016.
 */
angular.module('puntsApp.admin.punts', ['ngRoute', 'puntsServices', 'ngSanitize'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin/punts', {
            templateUrl: 'admin/punt/adminpunt.html',
            controller: 'AdminPunts'
        });
    }])

    .controller('AdminPunts', ['$scope', function ($scope) {

        $scope.today1 = function () {
            $scope.dtfrom = new Date().setHours(0, 0, 0, 0);
            $scope.dtto = new Date().setHours(0, 0, 0, 0);
        };
        $scope.today1();

        $scope.clear = function () {
            $scope.dtfrom = null;
            $scope.dtto = null;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

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
