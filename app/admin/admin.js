/**
 * Created by rg12 on 28/04/2016.
 */
angular.module('puntsApp.admin', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin', {
            templateUrl: 'admin/admin.html',
            controller: 'PuntsAdmin'
        });
    }])

    .controller('PuntsAdmin', [function () {

    }]);