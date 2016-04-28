angular.module('puntsApp.settings', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mysettings', {
            templateUrl: 'mysettings/mysettings.html',
            controller: 'PuntsSettings'
        });
    }])

    .controller('PuntsSettings', [function () {
        $scope.updateUser = function () {

        };
    }]);
