angular.module('puntsApp.status', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/status', {
            templateUrl: 'status/status.html',
            controller: 'PuntsStatus'
        });
    }])

    .controller('PuntsStatus', [function () {

    }]);