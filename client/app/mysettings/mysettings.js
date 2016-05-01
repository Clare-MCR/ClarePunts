angular.module('puntsApp.settings', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mysettings', {
            templateUrl: 'mysettings/mysettings.html',
            controller: 'PuntsSettings'
        });
    }])

    .controller('PuntsSettings', ['$scope', function ($scope) {
        $scope.updateUser = function () {

        };
    }]);
